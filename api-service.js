// API Service - WebSocket Connection
class APIService {
  constructor() {
    this.ws = null;
    this.isConnected = false;
    this.subscriptions = new Map();
    this.requestId = 1;
    this.pendingRequests = new Map();
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.pingInterval = null;
  }
  
  async connect(token) {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(APP_CONFIG.websocket.url + `?app_id=${APP_CONFIG.appId}`);
        
        const timeout = setTimeout(() => {
          reject(new Error('Timeout na conexão'));
          this.ws.close();
        }, 10000);
        
        this.ws.onopen = () => {
          clearTimeout(timeout);
          this.send({ authorize: token }).then(response => {
            if (response.error) {
              reject(new Error(response.error.message));
              return;
            }
            
            this.isConnected = true;
            this.reconnectAttempts = 0;
            
            authService.setUser({
              loginid: response.authorize.loginid,
              currency: response.authorize.currency,
              balance: response.authorize.balance,
              fullname: response.authorize.fullname,
              email: response.authorize.email
            });
            
            this.subscribeBalance();
            this.startPing();
            resolve(true);
          }).catch(reject);
        };
        
        this.ws.onmessage = (msg) => this.handleMessage(msg);
        
        this.ws.onerror = (error) => {
          clearTimeout(timeout);
          reject(new Error('Erro na conexão WebSocket'));
        };
        
        this.ws.onclose = () => {
          this.isConnected = false;
          this.stopPing();
          if (this.reconnectAttempts < this.maxReconnectAttempts) {
            setTimeout(() => this.reconnect(), 3000);
          }
        };
        
      } catch (error) {
        reject(error);
      }
    });
  }
  
  send(request) {
    return new Promise((resolve, reject) => {
      if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
        reject(new Error('WebSocket não conectado'));
        return;
      }
      
      const reqId = this.requestId++;
      request.req_id = reqId;
      
      this.pendingRequests.set(reqId, { resolve, reject });
      
      this.ws.send(JSON.stringify(request));
      
      setTimeout(() => {
        if (this.pendingRequests.has(reqId)) {
          this.pendingRequests.delete(reqId);
          reject(new Error('Timeout na requisição'));
        }
      }, 30000);
    });
  }
  
  handleMessage(msg) {
    try {
      const data = JSON.parse(msg.data);
      
      if (data.error) {
        console.error('API Error:', data.error);
        if (this.pendingRequests.has(data.req_id)) {
          this.pendingRequests.get(data.req_id).reject(new Error(data.error.message));
          this.pendingRequests.delete(data.req_id);
        }
        return;
      }
      
      if (data.req_id && this.pendingRequests.has(data.req_id)) {
        this.pendingRequests.get(data.req_id).resolve(data);
        this.pendingRequests.delete(data.req_id);
        return;
      }
      
      if (data.msg_type === 'tick' && data.tick) {
        window.dispatchEvent(new CustomEvent('price_update', {
          detail: {
            symbol: data.tick.symbol,
            price: data.tick.quote,
            timestamp: data.tick.epoch * 1000
          }
        }));
        
        chartService.updateChart(data.tick.quote, data.tick.epoch * 1000);
        analysisService.addPrice(data.tick.quote, data.tick.epoch * 1000);
      }
      
      if (data.msg_type === 'balance' && data.balance) {
        window.dispatchEvent(new CustomEvent('balance_update', {
          detail: { balance: data.balance.balance }
        }));
      }
      
      if (data.msg_type === 'proposal_open_contract' && data.proposal_open_contract) {
        const contract = data.proposal_open_contract;
        window.dispatchEvent(new CustomEvent('contract_update', {
          detail: {
            contract_id: contract.contract_id,
            is_sold: contract.is_sold,
            profit: contract.profit,
            sell_price: contract.sell_price
          }
        }));
        
        if (tradingBot.isRunning && contract.is_sold) {
          tradingBot.handleTradeResult({ profit: contract.profit });
        }
      }
      
    } catch (error) {
      console.error('Erro ao processar mensagem:', error);
    }
  }
  
  async getProposal(params) {
    return this.send({
      proposal: 1,
      amount: params.amount,
      basis: 'stake',
      contract_type: params.contractType,
      currency: 'USD',
      duration: params.duration,
      duration_unit: params.durationUnit,
      symbol: params.symbol
    });
  }
  
  async buyContract(proposalId, price) {
    return this.send({
      buy: proposalId,
      price: price
    });
  }
  
  async subscribeTicks(symbol) {
    const response = await this.send({
      ticks: symbol,
      subscribe: 1
    });
    
    if (response.subscription) {
      this.subscriptions.set(symbol, response.subscription.id);
    }
    
    return response;
  }
  
  async subscribeContract(contractId) {
    return this.send({
      proposal_open_contract: 1,
      contract_id: contractId,
      subscribe: 1
    });
  }
  
  async subscribeBalance() {
    return this.send({
      balance: 1,
      subscribe: 1
    });
  }
  
  startPing() {
    this.pingInterval = setInterval(() => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.send({ ping: 1 }).catch(() => {});
      }
    }, 30000);
  }
  
  stopPing() {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
  }
  
  async reconnect() {
    this.reconnectAttempts++;
    const token = authService.getToken();
    if (token) {
      try {
        await this.connect(token);
      } catch (error) {
        console.error('Falha na reconexão:', error);
      }
    }
  }
  
  disconnect() {
    this.stopPing();
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.isConnected = false;
    this.subscriptions.clear();
    this.pendingRequests.clear();
  }
}

const apiService = new APIService();
window.apiService = apiService;
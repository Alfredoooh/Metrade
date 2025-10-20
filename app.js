// Main Application Controller
class DerivProApp {
  constructor() {
    this.currentPage = 'home';
    this.currentSymbol = null;
    this.tradeHistory = [];
    this.pendingContracts = new Map();
    this.theme = localStorage.getItem(APP_CONFIG.storageKeys.theme) || 'auto';
    this.stats = { totalTrades: 0, wins: 0, losses: 0, profit: 0 };
    
    this.initElements();
    this.initEventListeners();
    this.initTheme();
  }

  initElements() {
    this.el = {
      loginScreen: document.getElementById('loginScreen'),
      appScreen: document.getElementById('appScreen'),
      loading: document.getElementById('loadingOverlay'),
      snackbar: document.getElementById('snackbar'),
      disclaimerModal: document.getElementById('disclaimerModal'),
      apiToken: document.getElementById('apiToken'),
      toggleToken: document.getElementById('toggleToken'),
      loginTokenBtn: document.getElementById('loginTokenBtn'),
      loginOAuthBtn: document.getElementById('loginOAuthBtn'),
      menuBtn: document.getElementById('menuBtn'),
      navDrawer: document.getElementById('navDrawer'),
      drawerOverlay: document.getElementById('drawerOverlay'),
      closeDrawer: document.getElementById('closeDrawer'),
      logoutBtn: document.getElementById('logoutBtn'),
      userName: document.getElementById('userName'),
      userId: document.getElementById('userId'),
      balanceAmount: document.getElementById('balanceAmount'),
      profitValue: document.getElementById('profitValue'),
      tradesValue: document.getElementById('tradesValue'),
      winRateValue: document.getElementById('winRateValue'),
      botStatus: document.getElementById('botStatus'),
      marketSearch: document.getElementById('marketSearch'),
      marketList: document.getElementById('marketList'),
      tradeSymbol: document.getElementById('tradeSymbol'),
      stakeAmount: document.getElementById('stakeAmount'),
      duration: document.getElementById('duration'),
      durationUnit: document.getElementById('durationUnit'),
      executeTrade: document.getElementById('executeTrade'),
      startBot: document.getElementById('startBot'),
      stopBot: document.getElementById('stopBot'),
      historyList: document.getElementById('historyList')
    };
  }

  initEventListeners() {
    this.el.loginTokenBtn.addEventListener('click', () => this.handleTokenLogin());
    this.el.loginOAuthBtn.addEventListener('click', () => authService.loginWithOAuth());
    this.el.toggleToken.addEventListener('click', () => this.toggleTokenVisibility());
    this.el.menuBtn.addEventListener('click', () => this.openDrawer());
    this.el.closeDrawer.addEventListener('click', () => this.closeDrawer());
    this.el.drawerOverlay.addEventListener('click', () => this.closeDrawer());
    this.el.logoutBtn.addEventListener('click', () => this.handleLogout());
    
    document.querySelectorAll('.nav-item, .nav-pill').forEach(item => {
      item.addEventListener('click', () => {
        const nav = item.dataset.nav;
        if (nav) {
          this.navigateTo(nav);
          this.closeDrawer();
        }
      });
    });
    
    this.el.marketSearch.addEventListener('input', (e) => this.filterMarkets(e.target.value));
    
    document.querySelectorAll('.category-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.category-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.filterByCategory(chip.dataset.category);
      });
    });
    
    document.querySelectorAll('.contract-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.contract-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
    
    this.el.executeTrade.addEventListener('click', () => this.executeTrade());
    
    document.querySelectorAll('.chart-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.chart-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        chartService.changeChartType(tab.dataset.chart);
      });
    });
    
    document.querySelectorAll('.indicator-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        chip.classList.toggle('active');
        const indicator = chip.dataset.indicator;
        if (chip.classList.contains('active')) {
          chartService.addIndicator(indicator);
        } else {
          chartService.removeIndicator(indicator);
        }
      });
    });
    
    this.el.startBot.addEventListener('click', () => this.startBot());
    this.el.stopBot.addEventListener('click', () => this.stopBot());
    
    document.getElementById('understoodBtn')?.addEventListener('click', () => this.closeDisclaimer());
    document.getElementById('learnMoreBtn')?.addEventListener('click', () => this.openLearnMore());
    
    window.addEventListener('price_update', (e) => this.handlePriceUpdate(e.detail));
    window.addEventListener('balance_update', (e) => this.handleBalanceUpdate(e.detail));
    window.addEventListener('contract_update', (e) => this.handleContractUpdate(e.detail));
  }

  initTheme() {
    if (this.theme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.body.className = prefersDark ? 'theme-dark' : 'theme-light';
    } else {
      document.body.className = `theme-${this.theme}`;
    }
  }

  async handleTokenLogin() {
    const token = this.el.apiToken.value.trim();
    if (!token) {
      this.showSnackbar('Por favor, insira o token', 'error');
      return;
    }

    this.showLoading(true);
    
    try {
      await authService.loginWithToken(token);
      this.showScreen('app');
      await this.initializeApp();
      this.showDisclaimer();
      this.showSnackbar('Login realizado com sucesso!', 'success');
    } catch (error) {
      this.showSnackbar('Falha no login: ' + error.message, 'error');
    } finally {
      this.showLoading(false);
    }
  }

  async initializeApp() {
    const user = authService.getUser();
    
    if (user) {
      this.el.userName.textContent = user.fullname || 'Usuário';
      this.el.userId.textContent = user.loginid;
      this.el.balanceAmount.textContent = `${user.currency} ${parseFloat(user.balance).toFixed(2)}`;
    }

    chartService.initChart('tradeChart');
    this.loadMarkets();
    this.updateStats();
    
    if (APP_CONFIG.settings.autoAnalysis) {
      setInterval(() => this.updateAnalysis(), 5000);
    }
  }

  loadMarkets() {
    const html = APP_CONFIG.markets.map(market => `
      <div class="market-item" data-symbol="${market.symbol}" data-category="${market.category}">
        <div class="market-icon">${market.icon}</div>
        <div class="market-info">
          <div class="market-name">${market.name}</div>
          <div class="market-symbol">${market.symbol}</div>
        </div>
        <div class="market-price">
          <div class="price-value" id="price-${market.symbol}">--</div>
          <div class="price-change" id="change-${market.symbol}">0.00%</div>
        </div>
      </div>
    `).join('');
    
    this.el.marketList.innerHTML = html;
    
    document.querySelectorAll('.market-item').forEach(item => {
      item.addEventListener('click', () => this.selectMarket(item.dataset.symbol));
    });
  }

  filterMarkets(query) {
    const items = document.querySelectorAll('.market-item');
    const lowerQuery = query.toLowerCase();
    
    items.forEach(item => {
      const name = item.querySelector('.market-name').textContent.toLowerCase();
      const symbol = item.querySelector('.market-symbol').textContent.toLowerCase();
      item.style.display = (name.includes(lowerQuery) || symbol.includes(lowerQuery)) ? 'flex' : 'none';
    });
  }

  filterByCategory(category) {
    const items = document.querySelectorAll('.market-item');
    items.forEach(item => {
      item.style.display = (category === 'all' || item.dataset.category === category) ? 'flex' : 'none';
    });
  }

  async selectMarket(symbol) {
    this.currentSymbol = symbol;
    const market = APP_CONFIG.markets.find(m => m.symbol === symbol);
    
    if (market) {
      this.el.tradeSymbol.textContent = market.name;
    }
    
    try {
      await apiService.subscribeTicks(symbol);
      chartService.clearChart();
      analysisService.reset();
      this.navigateTo('trade');
    } catch (error) {
      this.showSnackbar('Falha ao carregar mercado', 'error');
    }
  }

  async executeTrade() {
    if (!this.currentSymbol) {
      this.showSnackbar('Selecione um mercado primeiro', 'error');
      return;
    }

    const contractType = document.querySelector('.contract-btn.active').dataset.contract;
    const amount = parseFloat(this.el.stakeAmount.value);
    const duration = parseInt(this.el.duration.value);
    const durationUnit = this.el.durationUnit.value;

    if (amount < 0.35) {
      this.showSnackbar('Valor mínimo: $0.35', 'error');
      return;
    }

    this.showLoading(true);

    try {
      const proposal = await apiService.getProposal({
        symbol: this.currentSymbol,
        contractType: contractType,
        amount: amount,
        duration: duration,
        durationUnit: durationUnit
      });

      if (proposal.proposal) {
        const buy = await apiService.buyContract(proposal.proposal.id, amount);
        
        if (buy.buy) {
          await apiService.subscribeContract(buy.buy.contract_id);
          
          const trade = {
            id: buy.buy.contract_id,
            type: contractType,
            symbol: this.currentSymbol,
            amount: amount,
            timestamp: Date.now(),
            status: 'pending'
          };
          
          this.tradeHistory.unshift(trade);
          this.pendingContracts.set(buy.buy.contract_id, trade);
          this.updateHistory();
          
          this.showSnackbar('Trade executado com sucesso!', 'success');
          this.vibrate([10, 50, 10]);
        }
      }
    } catch (error) {
      this.showSnackbar('Falha na execução: ' + error.message, 'error');
    } finally {
      this.showLoading(false);
    }
  }

  async startBot() {
    if (!this.currentSymbol) {
      this.showSnackbar('Selecione um mercado primeiro', 'error');
      return;
    }

    const config = {
      symbol: this.currentSymbol,
      initialStake: parseFloat(document.getElementById('botStake').value),
      strategy: document.getElementById('botStrategy').value,
      stopLoss: parseFloat(document.getElementById('botStopLoss').value),
      takeProfit: parseFloat(document.getElementById('botTakeProfit').value),
      maxLosses: parseInt(document.getElementById('botMaxLosses').value),
      useAnalysis: document.getElementById('botAutoAnalysis').checked
    };

    try {
      await tradingBot.start(config);
      this.el.startBot.classList.add('hidden');
      this.el.stopBot.classList.remove('hidden');
      this.el.botStatus.textContent = 'Ativo';
      document.getElementById('botStatusIndicator').querySelector('.status-text').textContent = 'Em Execução';
      document.getElementById('botStatusIndicator').querySelector('.status-dot').classList.add('active');
      this.showSnackbar('Bot iniciado!', 'success');
      
      this.updateBotStats();
      this.botStatsInterval = setInterval(() => this.updateBotStats(), 2000);
    } catch (error) {
      this.showSnackbar('Erro ao iniciar bot: ' + error.message, 'error');
    }
  }

  stopBot() {
    tradingBot.stop();
    this.el.startBot.classList.remove('hidden');
    this.el.stopBot.classList.add('hidden');
    this.el.botStatus.textContent = 'Inativo';
    document.getElementById('botStatusIndicator').querySelector('.status-text').textContent = 'Inativo';
    document.getElementById('botStatusIndicator').querySelector('.status-dot').classList.remove('active');
    
    if (this.botStatsInterval) {
      clearInterval(this.botStatsInterval);
    }
    
    this.showSnackbar('Bot parado', 'info');
  }

  updateBotStats() {
    const stats = tradingBot.getStats();
    document.getElementById('botTotalTrades').textContent = stats.totalTrades;
    document.getElementById('botWins').textContent = stats.wins;
    document.getElementById('botLosses').textContent = stats.losses;
    document.getElementById('botProfit').textContent = `$${stats.profit.toFixed(2)}`;
    document.getElementById('botProfit').className = `bot-stat-value ${stats.profit >= 0 ? 'positive' : 'negative'}`;
  }

  handlePriceUpdate(data) {
    const priceEl = document.getElementById(`price-${data.symbol}`);
    const changeEl = document.getElementById(`change-${data.symbol}`);
    
    if (priceEl) {
      const oldPrice = parseFloat(priceEl.textContent) || data.price;
      priceEl.textContent = data.price.toFixed(5);
      
      if (changeEl) {
        const change = ((data.price - oldPrice) / oldPrice * 100).toFixed(2);
        changeEl.textContent = `${change >= 0 ? '+' : ''}${change}%`;
        changeEl.className = `price-change ${change >= 0 ? 'positive' : 'negative'}`;
      }
    }
    
    if (data.symbol === this.currentSymbol) {
      document.getElementById('widgetSymbol').textContent = data.symbol;
      document.getElementById('widgetPrice').textContent = data.price.toFixed(5);
    }
  }

  handleBalanceUpdate(data) {
    const user = authService.getUser();
    if (user) {
      this.el.balanceAmount.textContent = `${user.currency} ${parseFloat(data.balance).toFixed(2)}`;
    }
  }

  handleContractUpdate(data) {
    if (data.is_sold && this.pendingContracts.has(data.contract_id)) {
      const trade = this.pendingContracts.get(data.contract_id);
      trade.status = data.profit > 0 ? 'win' : 'loss';
      trade.profit = data.profit;
      trade.sellPrice = data.sell_price;
      
      this.stats.totalTrades++;
      if (data.profit > 0) {
        this.stats.wins++;
      } else {
        this.stats.losses++;
      }
      this.stats.profit += data.profit;
      
      this.pendingContracts.delete(data.contract_id);
      this.updateStats();
      this.updateHistory();
      
      const message = data.profit > 0 ? `Ganhou $${data.profit.toFixed(2)}!` : `Perdeu $${Math.abs(data.profit).toFixed(2)}`;
      this.showSnackbar(message, data.profit > 0 ? 'success' : 'error');
      this.vibrate(data.profit > 0 ? [10, 50, 10, 50, 10] : [100]);
    }
  }

  updateAnalysis() {
    const analysis = analysisService.getAnalysis();
    
    if (analysis.prediction) {
      document.getElementById('trendValue').textContent = analysis.trend;
      document.getElementById('recommendationValue').textContent = analysis.prediction.recommendation;
      document.getElementById('confidenceBadge').textContent = `${(analysis.prediction.confidence * 100).toFixed(0)}%`;
      
      document.getElementById('riseProb').style.width = `${analysis.prediction.probabilities.rise}%`;
      document.getElementById('fallProb').style.width = `${analysis.prediction.probabilities.fall}%`;
      document.getElementById('riseProbText').textContent = `${analysis.prediction.probabilities.rise.toFixed(0)}%`;
      document.getElementById('fallProbText').textContent = `${analysis.prediction.probabilities.fall.toFixed(0)}%`;
      
      document.getElementById('widgetPrediction').textContent = analysis.prediction.direction;
    }
  }

  updateStats() {
    this.el.tradesValue.textContent = this.stats.totalTrades;
    this.el.profitValue.textContent = `${this.stats.profit >= 0 ? '+' : ''}$${this.stats.profit.toFixed(2)}`;
    this.el.profitValue.className = `stat-value ${this.stats.profit >= 0 ? 'positive' : 'negative'}`;
    
    const winRate = this.stats.totalTrades > 0 ? (this.stats.wins / this.stats.totalTrades * 100).toFixed(1) : 0;
    this.el.winRateValue.textContent = `${winRate}%`;
  }

  updateHistory() {
    if (this.tradeHistory.length === 0) {
      this.el.historyList.innerHTML = '<div class="empty-state"><span class="material-symbols-rounded">receipt_long</span><p>Nenhuma trade ainda</p></div>';
      return;
    }

    const html = this.tradeHistory.slice(0, 50).map(trade => {
      const statusClass = trade.status === 'win' ? 'win' : trade.status === 'loss' ? 'loss' : '';
      const icon = trade.status === 'win' ? 'check_circle' : trade.status === 'loss' ? 'cancel' : 'schedule';
      const profitText = trade.profit ? `${trade.profit >= 0 ? '+' : ''}$${trade.profit.toFixed(2)}` : 'Pendente';
      
      return `
        <div class="history-item ${statusClass}">
          <span class="material-symbols-rounded history-icon">${icon}</span>
          <div class="history-details">
            <div class="history-title">${trade.type} - ${trade.symbol}</div>
            <div class="history-time">${new Date(trade.timestamp).toLocaleString('pt-BR')}</div>
          </div>
          <div class="history-amount">${profitText}</div>
        </div>
      `;
    }).join('');

    this.el.historyList.innerHTML = html;
  }

  navigateTo(page) {
    this.currentPage = page;
    
    document.querySelectorAll('.nav-item, .nav-pill').forEach(item => {
      item.classList.toggle('active', item.dataset.nav === page);
    });
    
    document.querySelectorAll('.content-page').forEach(p => {
      p.classList.toggle('active', p.dataset.page === page);
    });
    
    document.getElementById('screenTitle').textContent = page.charAt(0).toUpperCase() + page.slice(1);
    this.vibrate(10);
  }

  openDrawer() {
    this.el.navDrawer.classList.add('open');
    this.el.drawerOverlay.classList.add('active');
  }

  closeDrawer() {
    this.el.navDrawer.classList.remove('open');
    this.el.drawerOverlay.classList.remove('active');
  }

  showScreen(screen) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    if (screen === 'login') this.el.loginScreen.classList.add('active');
    else if (screen === 'app') this.el.appScreen.classList.add('active');
  }

  showLoading(show = true) {
    this.el.loading.classList.toggle('active', show);
  }

  showSnackbar(message, type = 'info') {
    this.el.snackbar.querySelector('.snackbar-text').textContent = message;
    this.el.snackbar.className = `snackbar ${type} show`;
    setTimeout(() => {
      this.el.snackbar.classList.remove('show');
    }, 3000);
  }

  showDisclaimer() {
    this.el.disclaimerModal.classList.add('show');
  }

  closeDisclaimer() {
    this.el.disclaimerModal.classList.remove('show');
  }

  openLearnMore() {
    window.open(APP_CONFIG.disclaimer.learnMoreUrl, '_blank');
  }

  toggleTokenVisibility() {
    const input = this.el.apiToken;
    const icon = this.el.toggleToken.querySelector('.material-symbols-rounded');
    input.type = input.type === 'password' ? 'text' : 'password';
    icon.textContent = input.type === 'password' ? 'visibility' : 'visibility_off';
  }

  handleLogout() {
    if (confirm('Deseja realmente sair?')) {
      authService.logout();
      this.showScreen('login');
      this.currentSymbol = null;
      this.tradeHistory = [];
      this.stats = { totalTrades: 0, wins: 0, losses: 0, profit: 0 };
    }
  }

  vibrate(pattern = 50) {
    if ('vibrate' in navigator && APP_CONFIG.settings.vibration) {
      navigator.vibrate(pattern);
    }
  }

  async init() {
    this.showLoading(true);
    const isAuthenticated = await authService.checkAuth();
    
    if (isAuthenticated) {
      this.showScreen('app');
      await this.initializeApp();
    } else {
      this.showScreen('login');
    }
    
    this.showLoading(false);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.app = new DerivProApp();
  app.init();
});
// Advanced Trading Bot Service
class TradingBotService {
  constructor() {
    this.isRunning = false;
    this.currentStrategy = null;
    this.stats = {
      totalTrades: 0,
      wins: 0,
      losses: 0,
      profit: 0,
      winStreak: 0,
      lossStreak: 0,
      maxWinStreak: 0,
      maxLossStreak: 0
    };
    this.config = {
      symbol: null,
      contractType: 'CALL',
      initialStake: 1.00,
      currentStake: 1.00,
      duration: 5,
      durationUnit: 't',
      strategy: 'accumulation',
      maxLosses: 3,
      winStreak: 2,
      multiplier: 2,
      accumulationRate: 1.5,
      stopLoss: 100,
      takeProfit: 500,
      autoAdjust: true,
      useAnalysis: true
    };
    this.tradeQueue = [];
    this.pendingTrade = null;
  }
  
  // Start bot
  async start(config) {
    if (this.isRunning) {
      throw new Error('Bot já está em execução');
    }
    
    Object.assign(this.config, config);
    
    if (!this.config.symbol) {
      throw new Error('Símbolo não definido');
    }
    
    this.isRunning = true;
    this.currentStrategy = this.getStrategy(this.config.strategy);
    
    this.tradingLoop();
    return true;
  }
  
  // Stop bot
  stop() {
    this.isRunning = false;
    this.pendingTrade = null;
  }
  
  // Trading loop
  async tradingLoop() {
    while (this.isRunning) {
      try {
        if (this.shouldStop()) {
          this.stop();
          break;
        }
        
        if (this.pendingTrade) {
          await this.sleep(1000);
          continue;
        }
        
        let contractType = this.config.contractType;
        
        if (this.config.useAnalysis) {
          const analysis = analysisService.getAnalysis();
          if (analysis.prediction && analysis.prediction.confidence > 0.6) {
            contractType = analysis.prediction.direction;
          }
        }
        
        await this.executeTrade(contractType);
        await this.sleep(this.config.duration * 1000 + 2000);
        
      } catch (error) {
        console.error('Erro no bot:', error);
        await this.sleep(5000);
      }
    }
  }
  
  // Execute trade
  async executeTrade(contractType) {
    try {
      const proposal = await apiService.getProposal({
        symbol: this.config.symbol,
        contractType: contractType,
        amount: this.config.currentStake,
        duration: this.config.duration,
        durationUnit: this.config.durationUnit
      });
      
      if (proposal.proposal) {
        const buy = await apiService.buyContract(proposal.proposal.id, this.config.currentStake);
        
        if (buy.buy) {
          this.pendingTrade = {
            id: buy.buy.contract_id,
            type: contractType,
            stake: this.config.currentStake,
            timestamp: Date.now()
          };
          
          await apiService.subscribeContract(buy.buy.contract_id);
        }
      }
    } catch (error) {
      console.error('Erro ao executar trade:', error);
    }
  }
  
  // Handle trade result
  handleTradeResult(result) {
    if (!this.pendingTrade) return;
    
    const profit = result.profit || 0;
    const isWin = profit > 0;
    
    this.stats.totalTrades++;
    this.stats.profit += profit;
    
    if (isWin) {
      this.stats.wins++;
      this.stats.winStreak++;
      this.stats.lossStreak = 0;
      this.stats.maxWinStreak = Math.max(this.stats.maxWinStreak, this.stats.winStreak);
      
      this.currentStrategy.onWin(this);
    } else {
      this.stats.losses++;
      this.stats.lossStreak++;
      this.stats.winStreak = 0;
      this.stats.maxLossStreak = Math.max(this.stats.maxLossStreak, this.stats.lossStreak);
      
      this.currentStrategy.onLoss(this);
    }
    
    this.pendingTrade = null;
  }
  
  // Get strategy
  getStrategy(strategyName) {
    const strategies = {
      martingale: {
        onWin: (bot) => {
          bot.config.currentStake = bot.config.initialStake;
        },
        onLoss: (bot) => {
          bot.config.currentStake *= bot.config.multiplier;
        }
      },
      accumulation: {
        onWin: (bot) => {
          if (bot.stats.winStreak >= bot.config.winStreak) {
            bot.config.currentStake = bot.config.initialStake;
            bot.stats.winStreak = 0;
          } else {
            bot.config.currentStake = bot.config.currentStake + (bot.stats.profit * bot.config.accumulationRate);
          }
        },
        onLoss: (bot) => {
          bot.config.currentStake = bot.config.initialStake + Math.abs(bot.stats.profit);
        }
      },
      fibonacci: {
        sequence: [1, 1, 2, 3, 5, 8, 13, 21],
        index: 0,
        onWin: (bot) => {
          this.index = Math.max(0, this.index - 2);
          bot.config.currentStake = bot.config.initialStake * this.sequence[this.index];
        },
        onLoss: (bot) => {
          this.index = Math.min(this.sequence.length - 1, this.index + 1);
          bot.config.currentStake = bot.config.initialStake * this.sequence[this.index];
        }
      },
      dalembert: {
        level: 0,
        onWin: (bot) => {
          this.level = Math.max(0, this.level - 1);
          bot.config.currentStake = bot.config.initialStake + (this.level * 0.5);
        },
        onLoss: (bot) => {
          this.level++;
          bot.config.currentStake = bot.config.initialStake + (this.level * 0.5);
        }
      }
    };
    
    return strategies[strategyName] || strategies.accumulation;
  }
  
  // Check if should stop
  shouldStop() {
    if (this.stats.profit <= -this.config.stopLoss) return true;
    if (this.stats.profit >= this.config.takeProfit) return true;
    if (this.stats.lossStreak >= this.config.maxLosses && this.config.strategy === 'accumulation') return true;
    return false;
  }
  
  // Sleep helper
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  // Get bot stats
  getStats() {
    return {
      ...this.stats,
      winRate: this.stats.totalTrades > 0 ? (this.stats.wins / this.stats.totalTrades * 100).toFixed(1) : 0,
      isRunning: this.isRunning,
      currentStake: this.config.currentStake
    };
  }
}

const tradingBot = new TradingBotService();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TradingBotService, tradingBot };
}
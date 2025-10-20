atualize este app ele não está fazendo login w também está de morando imenso para carregar

<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <meta name="theme-color" content="#BA1A1A">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <title>Deriv Pro Trading</title>
  
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <!-- Login Screen -->
  <div id="loginScreen" class="screen active">
    <div class="login-background">
      <div class="login-content">
        <div class="logo-container">
          <span class="material-symbols-rounded logo-icon">trending_up</span>
          <h1 class="app-title">Deriv Pro</h1>
          <p class="app-subtitle">Advanced Trading Platform</p>
        </div>

        <div class="login-form">
          <div class="input-group">
            <label class="input-label">API Token</label>
            <div class="input-wrapper">
              <span class="material-symbols-rounded input-icon">vpn_key</span>
              <input type="password" id="apiToken" class="input-field" placeholder="Cole seu token de API">
              <button class="icon-button" id="toggleToken">
                <span class="material-symbols-rounded">visibility</span>
              </button>
            </div>
          </div>

          <button class="primary-button" id="loginTokenBtn">
            <span class="material-symbols-rounded">login</span>
            <span>Entrar com Token</span>
          </button>

          <div class="divider"><span>ou</span></div>

          <button class="secondary-button" id="loginOAuthBtn">
            <span class="material-symbols-rounded">account_circle</span>
            <span>Entrar com Deriv</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Main App -->
  <div id="appScreen" class="screen">
    <header class="top-app-bar">
      <button class="icon-button" id="menuBtn">
        <span class="material-symbols-rounded">menu</span>
      </button>
      <div class="app-bar-title"><span id="screenTitle">Home</span></div>
      <button class="icon-button" id="accountBtn">
        <span class="material-symbols-rounded">account_circle</span>
      </button>
    </header>

    <nav class="navigation-drawer" id="navDrawer">
      <div class="drawer-header">
        <span class="material-symbols-rounded drawer-logo">trending_up</span>
        <h2 class="drawer-title">Deriv Pro</h2>
        <button class="icon-button" id="closeDrawer">
          <span class="material-symbols-rounded">close</span>
        </button>
      </div>
      <div class="drawer-content">
        <div class="nav-section">
          <button class="nav-item" data-nav="calculator">
            <span class="material-symbols-rounded">calculate</span>
            <span>Calculadora</span>
          </button>
          <button class="nav-item" data-nav="notes">
            <span class="material-symbols-rounded">note</span>
            <span>Anotações</span>
          </button>
          <button class="nav-item" data-nav="strategy">
            <span class="material-symbols-rounded">psychology</span>
            <span>Estratégias</span>
          </button>
          <button class="nav-item" data-nav="settings">
            <span class="material-symbols-rounded">settings</span>
            <span>Configurações</span>
          </button>
          <button class="nav-item" id="logoutBtn">
            <span class="material-symbols-rounded">logout</span>
            <span>Sair</span>
          </button>
        </div>
      </div>
    </nav>

    <div class="drawer-overlay" id="drawerOverlay"></div>

    <main class="content-container" id="contentContainer">
      <!-- Home Page -->
      <div class="content-page active" data-page="home">
        <div class="user-profile-card" id="userProfileCard">
          <div class="user-avatar">
            <span class="material-symbols-rounded">account_circle</span>
          </div>
          <div class="user-info">
            <h3 class="user-name" id="userName">Carregando...</h3>
            <p class="user-id" id="userId">---</p>
          </div>
          <button class="icon-button">
            <span class="material-symbols-rounded">arrow_forward_ios</span>
          </button>
        </div>

        <div class="balance-card">
          <div class="balance-header">
            <h3>Saldo Total</h3>
            <button class="icon-button" id="refreshBalance">
              <span class="material-symbols-rounded">refresh</span>
            </button>
          </div>
          <h2 class="balance-amount" id="balanceAmount">$0.00</h2>
          <div class="balance-change" id="balanceChange">+$0.00 hoje</div>
        </div>

        <div class="stats-grid">
          <div class="stat-card">
            <span class="material-symbols-rounded stat-icon">trending_up</span>
            <div class="stat-content">
              <p class="stat-label">Lucro</p>
              <p class="stat-value positive" id="profitValue">+$0.00</p>
            </div>
          </div>
          <div class="stat-card">
            <span class="material-symbols-rounded stat-icon">swap_horiz</span>
            <div class="stat-content">
              <p class="stat-label">Trades</p>
              <p class="stat-value" id="tradesValue">0</p>
            </div>
          </div>
          <div class="stat-card">
            <span class="material-symbols-rounded stat-icon">percent</span>
            <div class="stat-content">
              <p class="stat-label">Win Rate</p>
              <p class="stat-value" id="winRateValue">0%</p>
            </div>
          </div>
          <div class="stat-card">
            <span class="material-symbols-rounded stat-icon">smart_toy</span>
            <div class="stat-content">
              <p class="stat-label">Bot Status</p>
              <p class="stat-value" id="botStatus">Inativo</p>
            </div>
          </div>
        </div>

        <div class="widget-container">
          <div class="widget-header">
            <h3>Widget de Trading</h3>
            <button class="icon-button" id="expandWidget">
              <span class="material-symbols-rounded">open_in_full</span>
            </button>
          </div>
          <div class="trading-widget" id="tradingWidget">
            <div class="widget-content">
              <div class="widget-status">
                <span class="status-indicator"></span>
                <span class="status-text">Aguardando...</span>
              </div>
              <div class="widget-data">
                <div class="widget-item">
                  <span class="widget-label">Símbolo</span>
                  <span class="widget-value" id="widgetSymbol">-</span>
                </div>
                <div class="widget-item">
                  <span class="widget-label">Preço</span>
                  <span class="widget-value" id="widgetPrice">-</span>
                </div>
                <div class="widget-item">
                  <span class="widget-label">Previsão</span>
                  <span class="widget-value" id="widgetPrediction">-</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Market Page -->
      <div class="content-page" data-page="market">
        <div class="page-header">
          <h2 class="page-title">Mercado</h2>
        </div>
        <div class="search-bar">
          <span class="material-symbols-rounded search-icon">search</span>
          <input type="text" class="search-input" id="marketSearch" placeholder="Buscar mercados...">
        </div>
        <div class="market-categories" id="marketCategories">
          <button class="category-chip active" data-category="all">Todos</button>
          <button class="category-chip" data-category="Synthetic">Synthetic</button>
          <button class="category-chip" data-category="Forex">Forex</button>
          <button class="category-chip" data-category="Crypto">Crypto</button>
        </div>
        <div class="market-list" id="marketList"></div>
      </div>

      <!-- Trade Page -->
      <div class="content-page" data-page="trade">
        <div class="page-header">
          <button class="icon-button" id="backBtn">
            <span class="material-symbols-rounded">arrow_back</span>
          </button>
          <div>
            <h2 class="page-title">Negociar</h2>
            <p class="page-subtitle" id="tradeSymbol">Selecione um ativo</p>
          </div>
        </div>

        <div class="chart-card">
          <div class="chart-controls">
            <div class="chart-tabs">
              <button class="chart-tab active" data-chart="line">
                <span class="material-symbols-rounded">show_chart</span>
              </button>
              <button class="chart-tab" data-chart="area">
                <span class="material-symbols-rounded">area_chart</span>
              </button>
              <button class="chart-tab" data-chart="candlestick">
                <span class="material-symbols-rounded">candlestick_chart</span>
              </button>
            </div>
            <button class="icon-button" id="expandChart">
              <span class="material-symbols-rounded">open_in_full</span>
            </button>
          </div>
          <div class="chart-container" id="tradeChartContainer">
            <canvas id="tradeChart"></canvas>
          </div>
          <div class="chart-indicators">
            <button class="indicator-chip" data-indicator="sma">SMA</button>
            <button class="indicator-chip" data-indicator="ema">EMA</button>
            <button class="indicator-chip" data-indicator="bollinger">Bollinger</button>
            <button class="indicator-chip" data-indicator="rsi">RSI</button>
          </div>
        </div>

        <div class="analysis-card" id="analysisCard">
          <div class="analysis-header">
            <h3>Análise de Mercado</h3>
            <span class="confidence-badge" id="confidenceBadge">-</span>
          </div>
          <div class="analysis-content">
            <div class="prediction-item">
              <span class="prediction-label">Tendência:</span>
              <span class="prediction-value" id="trendValue">Neutro</span>
            </div>
            <div class="prediction-item">
              <span class="prediction-label">Recomendação:</span>
              <span class="prediction-value" id="recommendationValue">Aguardar</span>
            </div>
            <div class="probability-bars">
              <div class="probability-bar">
                <span>Rise</span>
                <div class="bar"><div class="fill rise" id="riseProb" style="width:0%"></div></div>
                <span id="riseProbText">0%</span>
              </div>
              <div class="probability-bar">
                <span>Fall</span>
                <div class="bar"><div class="fill fall" id="fallProb" style="width:0%"></div></div>
                <span id="fallProbText">0%</span>
              </div>
            </div>
          </div>
        </div>

        <div class="trade-controls">
          <div class="contract-selector">
            <button class="contract-btn active" data-contract="CALL">
              <span class="material-symbols-rounded">arrow_upward</span>
              <span>Rise</span>
            </button>
            <button class="contract-btn" data-contract="PUT">
              <span class="material-symbols-rounded">arrow_downward</span>
              <span>Fall</span>
            </button>
          </div>

          <div class="input-row">
            <div class="input-group">
              <label class="input-label">Valor</label>
              <div class="input-wrapper">
                <span class="currency-symbol">$</span>
                <input type="number" id="stakeAmount" class="input-field" value="1.00" min="0.35" step="0.01">
              </div>
            </div>
            <div class="input-group">
              <label class="input-label">Duração</label>
              <div class="input-wrapper">
                <input type="number" id="duration" class="input-field" value="5" min="1">
                <select id="durationUnit" class="select-field">
                  <option value="t">Ticks</option>
                  <option value="s">Seg</option>
                  <option value="m">Min</option>
                </select>
              </div>
            </div>
          </div>

          <button class="trade-button" id="executeTrade">
            <span class="material-symbols-rounded">rocket_launch</span>
            <span>Executar Trade</span>
          </button>
        </div>
      </div>

      <!-- Bot Page -->
      <div class="content-page" data-page="bot">
        <div class="page-header">
          <h2 class="page-title">Bot de Trading</h2>
          <div class="bot-status-indicator" id="botStatusIndicator">
            <span class="status-dot"></span>
            <span class="status-text">Inativo</span>
          </div>
        </div>

        <div class="bot-config-card">
          <h3>Configuração</h3>
          <div class="config-group">
            <label>Estratégia</label>
            <select id="botStrategy" class="select-field">
              <option value="accumulation">Acumulação</option>
              <option value="martingale">Martingale</option>
              <option value="fibonacci">Fibonacci</option>
              <option value="dalembert">D'Alembert</option>
            </select>
          </div>
          <div class="config-row">
            <div class="config-group">
              <label>Valor Inicial</label>
              <input type="number" id="botStake" class="input-field" value="1.00" min="0.35" step="0.01">
            </div>
            <div class="config-group">
              <label>Stop Loss</label>
              <input type="number" id="botStopLoss" class="input-field" value="100" min="1">
            </div>
          </div>
          <div class="config-row">
            <div class="config-group">
              <label>Take Profit</label>
              <input type="number" id="botTakeProfit" class="input-field" value="500" min="1">
            </div>
            <div class="config-group">
              <label>Max Perdas</label>
              <input type="number" id="botMaxLosses" class="input-field" value="3" min="1">
            </div>
          </div>
          <div class="config-switches">
            <label class="switch-label">
              <input type="checkbox" id="botAutoAnalysis" checked>
              <span class="switch-slider"></span>
              <span>Usar Análise Automática</span>
            </label>
          </div>
        </div>

        <div class="bot-stats-card">
          <h3>Estatísticas</h3>
          <div class="bot-stats-grid">
            <div class="bot-stat">
              <span class="bot-stat-label">Total Trades</span>
              <span class="bot-stat-value" id="botTotalTrades">0</span>
            </div>
            <div class="bot-stat">
              <span class="bot-stat-label">Vitórias</span>
              <span class="bot-stat-value positive" id="botWins">0</span>
            </div>
            <div class="bot-stat">
              <span class="bot-stat-label">Derrotas</span>
              <span class="bot-stat-value negative" id="botLosses">0</span>
            </div>
            <div class="bot-stat">
              <span class="bot-stat-label">Lucro</span>
              <span class="bot-stat-value" id="botProfit">$0.00</span>
            </div>
          </div>
        </div>

        <div class="bot-actions">
          <button class="bot-start-button" id="startBot">
            <span class="material-symbols-rounded">play_arrow</span>
            <span>Iniciar Bot</span>
          </button>
          <button class="bot-stop-button hidden" id="stopBot">
            <span class="material-symbols-rounded">stop</span>
            <span>Parar Bot</span>
          </button>
        </div>
      </div>

      <!-- History Page -->
      <div class="content-page" data-page="history">
        <div class="page-header">
          <h2 class="page-title">Histórico</h2>
          <button class="icon-button" id="clearHistory">
            <span class="material-symbols-rounded">delete</span>
          </button>
        </div>
        <div class="history-tabs">
          <button class="history-tab active" data-tab="all">Todos</button>
          <button class="history-tab" data-tab="wins">Vitórias</button>
          <button class="history-tab" data-tab="losses">Derrotas</button>
          <button class="history-tab" data-tab="pending">Pendentes</button>
        </div>
        <div class="history-list" id="historyList"></div>
      </div>
    </main>

    <!-- Bottom Navigation -->
    <nav class="bottom-nav">
      <button class="nav-pill active" data-nav="home">
        <span class="material-symbols-rounded">home</span>
        <span>Home</span>
      </button>
      <button class="nav-pill" data-nav="market">
        <span class="material-symbols-rounded">candlestick_chart</span>
        <span>Mercado</span>
      </button>
      <button class="nav-pill" data-nav="trade">
        <span class="material-symbols-rounded">swap_horiz</span>
        <span>Negociar</span>
      </button>
      <button class="nav-pill" data-nav="bot">
        <span class="material-symbols-rounded">smart_toy</span>
        <span>Bot</span>
      </button>
      <button class="nav-pill" data-nav="history">
        <span class="material-symbols-rounded">history</span>
        <span>Histórico</span>
      </button>
    </nav>
  </div>

  <!-- Risk Disclaimer Modal -->
  <div class="modal" id="disclaimerModal">
    <div class="modal-content">
      <div class="modal-header">
        <span class="material-symbols-rounded modal-icon">warning</span>
        <h3 class="modal-title">Aviso de Risco</h3>
      </div>
      <div class="modal-body">
        <p>A Deriv oferece produtos complexos que podem não ser adequados para todos. Certifique-se de que compreende totalmente os riscos envolvidos antes de negociar.</p>
      </div>
      <div class="modal-actions">
        <button class="modal-button secondary" id="learnMoreBtn">Saber Mais</button>
        <button class="modal-button primary" id="understoodBtn">Ok, Entendi</button>
      </div>
    </div>
  </div>

  <!-- Snackbar -->
  <div class="snackbar" id="snackbar">
    <span class="snackbar-text"></span>
  </div>

  <!-- Loading -->
  <div class="loading-overlay" id="loadingOverlay">
    <div class="loading-spinner"></div>
    <p class="loading-text">Carregando...</p>
  </div>

  <!-- Scripts -->
  <script src="app-config.js"></script>
  <script src="translations.js"></script>
  <script src="auth-service.js"></script>
  <script src="api-service.js"></script>
  <script src="chart-service.js"></script>
  <script src="analysis-service.js"></script>
  <script src="bot-service.js"></script>
  <script src="app.js"></script>
</body>
</html>

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

// auth-service.js
// Depende de: app-config.js
// Fornece: window.authService

(function() {
  if (!window.APP_CONFIG) {
    console.error('APP_CONFIG não encontrado. Carregue app-config.js antes de auth-service.js');
  }
  
  const STORAGE = window.APP_CONFIG && window.APP_CONFIG.storageKeys ? window.APP_CONFIG.storageKeys : {
    token: 'deriv_pro_token',
    user: 'deriv_pro_user'
  };
  
  const authService = {
    _oauthListenerAdded: false,
    
    loginWithToken: async function(token) {
      if (!token) throw new Error('Token vazio');
      try {
        localStorage.setItem(STORAGE.token, token);
      } catch (e) {
        console.warn('Não foi possível salvar token no localStorage', e);
      }
      
      // tenta conectar via apiService (apiService deve estar disponível globalmente)
      if (!window.apiService) {
        // apiService pode não estar carregado ainda — tentar conectar depois
        return new Promise((resolve, reject) => {
          // retentar quando apiService disponível
          const check = setInterval(() => {
            if (window.apiService) {
              clearInterval(check);
              window.apiService.connect(token).then(() => resolve(true)).catch(err => {
                // remove token se falhar
                try { localStorage.removeItem(STORAGE.token); } catch (e) {}
                reject(err);
              });
            }
          }, 200);
          // timeout 10s
          setTimeout(() => {
            clearInterval(check);
            reject(new Error('apiService não inicializado'));
          }, 10000);
        });
      } else {
        try {
          await window.apiService.connect(token);
          return true;
        } catch (err) {
          try { localStorage.removeItem(STORAGE.token); } catch (e) {}
          throw err;
        }
      }
    },
    
    loginWithOAuth: function() {
      const cfg = window.APP_CONFIG.oauth;
      const url = new URL(cfg.authUrl);
      url.searchParams.set('client_id', cfg.clientId);
      url.searchParams.set('redirect_uri', cfg.redirectUri);
      // usar response_type=token para fluxo implicito no browser (ajuste conforme necessário)
      url.searchParams.set('response_type', 'token');
      url.searchParams.set('scope', cfg.scopes.join(' '));
      // opcional: state
      // abrir janela popup para o fluxo OAuth
      window.open(url.toString(), '_blank', 'width=600,height=800');
      // auth-callback.html deve extrair token e postar de volta com postMessage
    },
    
    _initOAuthListener: function() {
      if (this._oauthListenerAdded) return;
      window.addEventListener('message', async (ev) => {
        try {
          if (!ev.data) return;
          if (ev.data && ev.data.type === 'DERIV_TOKEN' && ev.data.token) {
            await authService.loginWithToken(ev.data.token);
            // Se existir app global, mostra app e inicializa
            window.app?.showScreen?.('app');
            window.app?.initializeApp?.();
          }
        } catch (e) {
          console.error('Erro no listener OAuth:', e);
        }
      });
      this._oauthListenerAdded = true;
    },
    
    setUser: function(userObj) {
      try {
        localStorage.setItem(STORAGE.user, JSON.stringify(userObj || {}));
      } catch (e) {
        console.warn('Falha ao salvar user:', e);
      }
    },
    
    getUser: function() {
      try {
        const raw = localStorage.getItem(STORAGE.user);
        return raw ? JSON.parse(raw) : null;
      } catch (e) {
        return null;
      }
    },
    
    getToken: function() {
      try {
        return localStorage.getItem(STORAGE.token);
      } catch (e) {
        return null;
      }
    },
    
    logout: function() {
      try {
        localStorage.removeItem(STORAGE.token);
        localStorage.removeItem(STORAGE.user);
      } catch (e) { /* ignore */ }
      try { window.apiService?.disconnect?.(); } catch (e) {}
    },
    
    checkAuth: async function() {
      const token = this.getToken();
      if (!token) return false;
      try {
        if (!window.apiService?.isConnected) {
          await window.apiService.connect(token);
        }
        return true;
      } catch (err) {
        console.warn('checkAuth falhou:', err);
        this.logout();
        return false;
      }
    }
  };
  
  authService._initOAuthListener();
  window.authService = authService;
})();

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

// Advanced Chart Service with Multiple Chart Types
class ChartService {
  constructor() {
    this.chart = null;
    this.chartData = [];
    this.maxDataPoints = 200;
    this.chartType = 'line';
    this.indicators = [];
    this.isExpanded = false;
  }
  
  // Initialize Chart
  initChart(canvasId, type = 'line') {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    this.chartType = type;
    const ctx = canvas.getContext('2d');
    
    const config = this.getChartConfig(type);
    this.chart = new Chart(ctx, config);
  }
  
  // Get Chart Configuration
  getChartConfig(type) {
    const baseConfig = {
      type: type,
      data: {
        labels: [],
        datasets: [{
          label: 'Price',
          data: [],
          borderColor: '#BA1A1A',
          backgroundColor: 'rgba(186, 26, 26, 0.1)',
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 4,
          tension: 0.4,
          fill: type === 'area'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: 'index'
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            padding: 16,
            cornerRadius: 12,
            titleFont: { size: 12, weight: '600' },
            bodyFont: { size: 14 },
            callbacks: {
              label: (context) => `${context.parsed.y.toFixed(5)}`
            }
          }
        },
        scales: {
          x: {
            display: true,
            grid: { display: false, drawBorder: false },
            ticks: { maxTicksLimit: 8, font: { size: 10 }, color: '#938F99' }
          },
          y: {
            display: true,
            position: 'right',
            grid: { color: 'rgba(147, 143, 153, 0.1)', drawBorder: false },
            ticks: {
              callback: (value) => value.toFixed(5),
              font: { size: 10 },
              color: '#938F99'
            }
          }
        },
        animation: { duration: 300 }
      }
    };
    
    if (type === 'candlestick') {
      baseConfig.type = 'bar';
      baseConfig.data.datasets[0].type = 'candlestick';
    }
    
    return baseConfig;
  }
  
  // Update Chart
  updateChart(price, timestamp) {
    if (!this.chart) return;
    
    const time = new Date(timestamp).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    
    this.chartData.push({ time, price, timestamp });
    
    if (this.chartData.length > this.maxDataPoints) {
      this.chartData.shift();
    }
    
    this.chart.data.labels = this.chartData.map(d => d.time);
    this.chart.data.datasets[0].data = this.chartData.map(d => d.price);
    
    // Update trend color
    if (this.chartData.length >= 2) {
      const current = this.chartData[this.chartData.length - 1].price;
      const previous = this.chartData[this.chartData.length - 2].price;
      const color = current > previous ? '#16C784' : '#FF5449';
      this.chart.data.datasets[0].borderColor = color;
      this.chart.data.datasets[0].backgroundColor = color + '20';
    }
    
    this.chart.update('none');
  }
  
  // Change Chart Type
  changeChartType(type) {
    if (!this.chart) return;
    
    this.chartType = type;
    const config = this.getChartConfig(type);
    
    config.data.labels = this.chart.data.labels;
    config.data.datasets[0].data = this.chart.data.datasets[0].data;
    
    this.chart.destroy();
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    this.chart = new Chart(ctx, config);
  }
  
  // Add Indicator
  addIndicator(indicator) {
    if (this.indicators.includes(indicator)) return;
    
    this.indicators.push(indicator);
    
    const dataset = this.createIndicatorDataset(indicator);
    if (dataset) {
      this.chart.data.datasets.push(dataset);
      this.chart.update();
    }
  }
  
  // Create Indicator Dataset
  createIndicatorDataset(indicator) {
    const prices = this.chartData.map(d => d.price);
    let data = [];
    let config = {};
    
    switch (indicator) {
      case 'sma':
        data = this.calculateSMA(prices, 20);
        config = {
          label: 'SMA(20)',
          data: data,
          borderColor: '#6750A4',
          borderWidth: 2,
          pointRadius: 0,
          fill: false
        };
        break;
        
      case 'ema':
        data = this.calculateEMA(prices, 12);
        config = {
          label: 'EMA(12)',
          data: data,
          borderColor: '#FF9800',
          borderWidth: 2,
          pointRadius: 0,
          fill: false
        };
        break;
        
      case 'bollinger':
        const bollinger = this.calculateBollinger(prices, 20, 2);
        return [
          {
            label: 'BB Upper',
            data: bollinger.upper,
            borderColor: '#2196F3',
            borderWidth: 1,
            borderDash: [5, 5],
            pointRadius: 0,
            fill: false
          },
          {
            label: 'BB Lower',
            data: bollinger.lower,
            borderColor: '#2196F3',
            borderWidth: 1,
            borderDash: [5, 5],
            pointRadius: 0,
            fill: false
          }
        ];
    }
    
    return config;
  }
  
  // Calculate SMA
  calculateSMA(data, period) {
    const result = [];
    for (let i = 0; i < data.length; i++) {
      if (i < period - 1) {
        result.push(null);
      } else {
        const slice = data.slice(i - period + 1, i + 1);
        const sum = slice.reduce((a, b) => a + b, 0);
        result.push(sum / period);
      }
    }
    return result;
  }
  
  // Calculate EMA
  calculateEMA(data, period) {
    const result = [];
    const multiplier = 2 / (period + 1);
    let ema = data[0];
    
    for (let i = 0; i < data.length; i++) {
      if (i === 0) {
        result.push(data[i]);
      } else {
        ema = (data[i] - ema) * multiplier + ema;
        result.push(ema);
      }
    }
    return result;
  }
  
  // Calculate Bollinger Bands
  calculateBollinger(data, period, stdDev) {
    const sma = this.calculateSMA(data, period);
    const upper = [];
    const lower = [];
    
    for (let i = 0; i < data.length; i++) {
      if (i < period - 1) {
        upper.push(null);
        lower.push(null);
      } else {
        const slice = data.slice(i - period + 1, i + 1);
        const mean = sma[i];
        const variance = slice.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / period;
        const std = Math.sqrt(variance);
        upper.push(mean + (std * stdDev));
        lower.push(mean - (std * stdDev));
      }
    }
    
    return { upper, lower };
  }
  
  // Remove Indicator
  removeIndicator(indicator) {
    const index = this.indicators.indexOf(indicator);
    if (index > -1) {
      this.indicators.splice(index, 1);
      this.chart.data.datasets = this.chart.data.datasets.filter(ds => !ds.label.includes(indicator.toUpperCase()));
      this.chart.update();
    }
  }
  
  // Toggle Expand
  toggleExpand() {
    this.isExpanded = !this.isExpanded;
    return this.isExpanded;
  }
  
  // Clear Chart
  clearChart() {
    if (!this.chart) return;
    
    this.chartData = [];
    this.chart.data.labels = [];
    this.chart.data.datasets[0].data = [];
    this.chart.update();
  }
  
  // Destroy Chart
  destroyChart() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
      this.chartData = [];
      this.indicators = [];
    }
  }
  
  // Get Chart Data
  getChartData() {
    return this.chartData;
  }
}

const chartService = new ChartService();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ChartService, chartService };
}

// Advanced App Configuration
const APP_CONFIG = {
  appId: 71954,
  appName: 'Deriv Pro Trading',
  version: '2.0.0',
  
  // OAuth Configuration
  oauth: {
    authUrl: 'https://oauth.deriv.com/oauth2/authorize',
    redirectUri: window.location.origin + '/auth-callback.html',
    clientId: 71954,
    scopes: ['read', 'trade', 'payments', 'trading_information', 'admin']
  },
  
  // WebSocket Configuration
  websocket: {
    url: 'wss://ws.derivws.com/websockets/v3',
    pingInterval: 30000,
    reconnectDelay: 3000,
    maxReconnectAttempts: 5
  },
  
  // Trading Configuration
  trading: {
    minStake: 0.35,
    maxStake: 50000,
    defaultStake: 1.00,
    contractTypes: {
      CALL: { name: 'Rise', icon: 'arrow_upward', color: '#16C784' },
      PUT: { name: 'Fall', icon: 'arrow_downward', color: '#FF5449' },
      DIGITEVEN: { name: 'Even', icon: 'filter_2', color: '#6750A4' },
      DIGITODD: { name: 'Odd', icon: 'filter_1', color: '#6750A4' },
      DIGITMATCH: { name: 'Match', icon: 'check_circle', color: '#6750A4' },
      DIGITDIFF: { name: 'Differ', icon: 'cancel', color: '#6750A4' },
      DIGITOVER: { name: 'Over', icon: 'expand_less', color: '#6750A4' },
      DIGITUNDER: { name: 'Under', icon: 'expand_more', color: '#6750A4' },
      ONETOUCH: { name: 'Touch', icon: 'touch_app', color: '#6750A4' },
      NOTOUCH: { name: 'No Touch', icon: 'do_not_touch', color: '#6750A4' }
    }
  },
  
  // Bot Configuration
  bot: {
    strategies: {
      martingale: {
        name: 'Martingale',
        description: 'Dobra o valor após perda',
        multiplier: 2,
        maxLosses: 3,
        resetOnWin: true
      },
      accumulation: {
        name: 'Acumulação',
        description: 'Acumula lucros progressivamente',
        winStreak: 2,
        accumulationRate: 1.5,
        resetOnLoss: true
      },
      fibonacci: {
        name: 'Fibonacci',
        description: 'Sequência de Fibonacci',
        sequence: [1, 1, 2, 3, 5, 8, 13, 21],
        resetOnWin: true
      },
      dalembert: {
        name: "D'Alembert",
        description: 'Aumenta/diminui gradualmente',
        increment: 0.5,
        maxLevel: 10,
        decreaseOnWin: true
      },
      custom: {
        name: 'Personalizado',
        description: 'Criar estratégia própria',
        customizable: true
      }
    }
  },
  
  // Market Symbols
  markets: [
    // Volatility Indices
    { symbol: 'R_10', name: 'Volatility 10 Index', type: 'volatility', icon: '📊', category: 'Synthetic' },
    { symbol: 'R_25', name: 'Volatility 25 Index', type: 'volatility', icon: '📈', category: 'Synthetic' },
    { symbol: 'R_50', name: 'Volatility 50 Index', type: 'volatility', icon: '📉', category: 'Synthetic' },
    { symbol: 'R_75', name: 'Volatility 75 Index', type: 'volatility', icon: '📊', category: 'Synthetic' },
    { symbol: 'R_100', name: 'Volatility 100 Index', type: 'volatility', icon: '📈', category: 'Synthetic' },
    { symbol: '1HZ10V', name: 'Volatility 10 (1s) Index', type: 'volatility', icon: '⚡', category: 'Synthetic' },
    { symbol: '1HZ25V', name: 'Volatility 25 (1s) Index', type: 'volatility', icon: '⚡', category: 'Synthetic' },
    { symbol: '1HZ50V', name: 'Volatility 50 (1s) Index', type: 'volatility', icon: '⚡', category: 'Synthetic' },
    { symbol: '1HZ75V', name: 'Volatility 75 (1s) Index', type: 'volatility', icon: '⚡', category: 'Synthetic' },
    { symbol: '1HZ100V', name: 'Volatility 100 (1s) Index', type: 'volatility', icon: '⚡', category: 'Synthetic' },
    
    // Crash/Boom Indices
    { symbol: 'BOOM1000', name: 'Boom 1000 Index', type: 'crash_boom', icon: '💥', category: 'Synthetic' },
    { symbol: 'BOOM500', name: 'Boom 500 Index', type: 'crash_boom', icon: '💥', category: 'Synthetic' },
    { symbol: 'BOOM300', name: 'Boom 300 Index', type: 'crash_boom', icon: '💥', category: 'Synthetic' },
    { symbol: 'CRASH1000', name: 'Crash 1000 Index', type: 'crash_boom', icon: '💥', category: 'Synthetic' },
    { symbol: 'CRASH500', name: 'Crash 500 Index', type: 'crash_boom', icon: '💥', category: 'Synthetic' },
    { symbol: 'CRASH300', name: 'Crash 300 Index', type: 'crash_boom', icon: '💥', category: 'Synthetic' },
    
    // Forex
    { symbol: 'frxEURUSD', name: 'EUR/USD', type: 'forex', icon: '💱', category: 'Forex' },
    { symbol: 'frxGBPUSD', name: 'GBP/USD', type: 'forex', icon: '💱', category: 'Forex' },
    { symbol: 'frxUSDJPY', name: 'USD/JPY', type: 'forex', icon: '💱', category: 'Forex' },
    { symbol: 'frxAUDUSD', name: 'AUD/USD', type: 'forex', icon: '💱', category: 'Forex' },
    
    // Crypto
    { symbol: 'cryBTCUSD', name: 'Bitcoin', type: 'crypto', icon: '₿', category: 'Crypto' },
    { symbol: 'cryETHUSD', name: 'Ethereum', type: 'crypto', icon: 'Ξ', category: 'Crypto' },
    { symbol: 'cryLTCUSD', name: 'Litecoin', type: 'crypto', icon: 'Ł', category: 'Crypto' }
  ],
  
  // Theme Configuration
  themes: {
    light: {
      name: 'Light',
      colors: {
        primary: '#BA1A1A',
        surface: '#FFFBFF',
        background: '#FFFBFF',
        text: '#1C1B1F'
      }
    },
    dark: {
      name: 'Dark',
      colors: {
        primary: '#FFB4AB',
        surface: '#1C1B1F',
        background: '#1C1B1F',
        text: '#E6E1E5'
      }
    },
    darkDeep: {
      name: 'Dark Deep',
      colors: {
        primary: '#FFB4AB',
        surface: '#000000',
        background: '#000000',
        text: '#E6E1E5'
      }
    },
    auto: {
      name: 'Auto',
      followSystem: true
    }
  },
  
  // Supported Languages
  languages: [
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' }
  ],
  
  // Chart Configuration
  chart: {
    types: ['candlestick', 'line', 'area', 'bars'],
    indicators: ['sma', 'ema', 'rsi', 'macd', 'bollinger', 'stochastic'],
    timeframes: ['1m', '5m', '15m', '30m', '1h', '4h', '1d'],
    maxDataPoints: 200
  },
  
  // Analysis Configuration
  analysis: {
    patterns: ['head_shoulders', 'double_top', 'double_bottom', 'triangle', 'wedge', 'flag'],
    trendlines: true,
    supportResistance: true,
    fibonacciLevels: [0, 0.236, 0.382, 0.5, 0.618, 1],
    confidenceThreshold: 0.7
  },
  
  // Settings
  settings: {
    defaultLanguage: 'pt',
    defaultCurrency: 'USD',
    theme: 'auto',
    notifications: true,
    vibration: true,
    soundEffects: false,
    autoAnalysis: true,
    tradingAssistant: true
  },
  
  // Storage Keys
  storageKeys: {
    token: 'deriv_pro_token',
    user: 'deriv_pro_user',
    settings: 'deriv_pro_settings',
    trades: 'deriv_pro_trades',
    strategies: 'deriv_pro_strategies',
    notes: 'deriv_pro_notes',
    theme: 'deriv_pro_theme',
    language: 'deriv_pro_language'
  },
  
  // Risk Disclaimer
  disclaimer: {
    title: 'Aviso de Risco',
    message: 'A Deriv oferece produtos complexos que podem não ser adequados para todos. Certifique-se de que compreende totalmente os riscos envolvidos antes de negociar.',
    learnMoreUrl: 'https://deriv.com/terms-and-conditions'
  }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = APP_CONFIG;
}

// Advanced Market Analysis Service
class AnalysisService {
  constructor() {
    this.priceHistory = [];
    this.currentTrend = 'neutral';
    this.patterns = [];
    this.indicators = {};
    this.prediction = null;
  }
  
  // Add price data
  addPrice(price, timestamp) {
    this.priceHistory.push({ price, timestamp });
    
    // Keep last 200 data points
    if (this.priceHistory.length > 200) {
      this.priceHistory.shift();
    }
    
    // Update analysis
    this.updateAnalysis();
  }
  
  // Update all analysis
  updateAnalysis() {
    if (this.priceHistory.length < 20) return;
    
    this.calculateIndicators();
    this.detectPatterns();
    this.identifyTrend();
    this.calculatePrediction();
  }
  
  // Calculate technical indicators
  calculateIndicators() {
    const prices = this.priceHistory.map(d => d.price);
    
    // Simple Moving Average (SMA)
    this.indicators.sma20 = this.calculateSMA(prices, 20);
    this.indicators.sma50 = this.calculateSMA(prices, 50);
    
    // Exponential Moving Average (EMA)
    this.indicators.ema12 = this.calculateEMA(prices, 12);
    this.indicators.ema26 = this.calculateEMA(prices, 26);
    
    // Relative Strength Index (RSI)
    this.indicators.rsi = this.calculateRSI(prices, 14);
    
    // MACD
    const macd = this.calculateMACD(prices);
    this.indicators.macd = macd.macd;
    this.indicators.signal = macd.signal;
    this.indicators.histogram = macd.histogram;
    
    // Bollinger Bands
    const bollinger = this.calculateBollingerBands(prices, 20, 2);
    this.indicators.bollingerUpper = bollinger.upper;
    this.indicators.bollingerMiddle = bollinger.middle;
    this.indicators.bollingerLower = bollinger.lower;
    
    // Stochastic Oscillator
    const stochastic = this.calculateStochastic(prices, 14);
    this.indicators.stochasticK = stochastic.k;
    this.indicators.stochasticD = stochastic.d;
  }
  
  // Calculate Simple Moving Average
  calculateSMA(data, period) {
    if (data.length < period) return null;
    const slice = data.slice(-period);
    const sum = slice.reduce((a, b) => a + b, 0);
    return sum / period;
  }
  
  // Calculate Exponential Moving Average
  calculateEMA(data, period) {
    if (data.length < period) return null;
    const multiplier = 2 / (period + 1);
    let ema = this.calculateSMA(data.slice(0, period), period);
    
    for (let i = period; i < data.length; i++) {
      ema = (data[i] - ema) * multiplier + ema;
    }
    
    return ema;
  }
  
  // Calculate RSI
  calculateRSI(data, period) {
    if (data.length < period + 1) return null;
    
    let gains = 0;
    let losses = 0;
    
    for (let i = data.length - period; i < data.length; i++) {
      const change = data[i] - data[i - 1];
      if (change > 0) gains += change;
      else losses -= change;
    }
    
    const avgGain = gains / period;
    const avgLoss = losses / period;
    
    if (avgLoss === 0) return 100;
    const rs = avgGain / avgLoss;
    return 100 - (100 / (1 + rs));
  }
  
  // Calculate MACD
  calculateMACD(data) {
    const ema12 = this.calculateEMA(data, 12);
    const ema26 = this.calculateEMA(data, 26);
    
    if (!ema12 || !ema26) return { macd: null, signal: null, histogram: null };
    
    const macd = ema12 - ema26;
    const signal = macd * 0.2; // Simplified signal line
    const histogram = macd - signal;
    
    return { macd, signal, histogram };
  }
  
  // Calculate Bollinger Bands
  calculateBollingerBands(data, period, stdDev) {
    const sma = this.calculateSMA(data, period);
    if (!sma) return { upper: null, middle: null, lower: null };
    
    const slice = data.slice(-period);
    const variance = slice.reduce((sum, val) => sum + Math.pow(val - sma, 2), 0) / period;
    const std = Math.sqrt(variance);
    
    return {
      upper: sma + (std * stdDev),
      middle: sma,
      lower: sma - (std * stdDev)
    };
  }
  
  // Calculate Stochastic Oscillator
  calculateStochastic(data, period) {
    if (data.length < period) return { k: null, d: null };
    
    const slice = data.slice(-period);
    const high = Math.max(...slice);
    const low = Math.min(...slice);
    const close = data[data.length - 1];
    
    const k = ((close - low) / (high - low)) * 100;
    const d = k * 0.3; // Simplified %D
    
    return { k, d };
  }
  
  // Detect chart patterns
  detectPatterns() {
    this.patterns = [];
    const prices = this.priceHistory.map(d => d.price);
    
    if (prices.length < 50) return;
    
    // Head and Shoulders
    if (this.detectHeadAndShoulders(prices)) {
      this.patterns.push({
        type: 'head_shoulders',
        name: 'Head and Shoulders',
        signal: 'bearish',
        confidence: 0.75
      });
    }
    
    // Double Top
    if (this.detectDoubleTop(prices)) {
      this.patterns.push({
        type: 'double_top',
        name: 'Double Top',
        signal: 'bearish',
        confidence: 0.70
      });
    }
    
    // Double Bottom
    if (this.detectDoubleBottom(prices)) {
      this.patterns.push({
        type: 'double_bottom',
        name: 'Double Bottom',
        signal: 'bullish',
        confidence: 0.70
      });
    }
    
    // Triangle Pattern
    if (this.detectTriangle(prices)) {
      this.patterns.push({
        type: 'triangle',
        name: 'Triangle',
        signal: 'neutral',
        confidence: 0.65
      });
    }
  }
  
  // Detect Head and Shoulders pattern
  detectHeadAndShoulders(prices) {
    const len = prices.length;
    if (len < 50) return false;
    
    const recent = prices.slice(-50);
    const peaks = this.findPeaks(recent);
    
    if (peaks.length >= 3) {
      const [s1, head, s2] = peaks.slice(-3);
      return head.value > s1.value && head.value > s2.value && 
             Math.abs(s1.value - s2.value) < (s1.value * 0.02);
    }
    
    return false;
  }
  
  // Detect Double Top pattern
  detectDoubleTop(prices) {
    const peaks = this.findPeaks(prices.slice(-30));
    if (peaks.length >= 2) {
      const [p1, p2] = peaks.slice(-2);
      return Math.abs(p1.value - p2.value) < (p1.value * 0.01);
    }
    return false;
  }
  
  // Detect Double Bottom pattern
  detectDoubleBottom(prices) {
    const troughs = this.findTroughs(prices.slice(-30));
    if (troughs.length >= 2) {
      const [t1, t2] = troughs.slice(-2);
      return Math.abs(t1.value - t2.value) < (t1.value * 0.01);
    }
    return false;
  }
  
  // Detect Triangle pattern
  detectTriangle(prices) {
    if (prices.length < 30) return false;
    
    const recent = prices.slice(-30);
    const highs = this.findPeaks(recent);
    const lows = this.findTroughs(recent);
    
    if (highs.length >= 2 && lows.length >= 2) {
      const highSlope = (highs[highs.length - 1].value - highs[0].value) / highs.length;
      const lowSlope = (lows[lows.length - 1].value - lows[0].value) / lows.length;
      
      return Math.abs(highSlope) < 0.5 && Math.abs(lowSlope) < 0.5;
    }
    
    return false;
  }
  
  // Find peaks in price data
  findPeaks(prices) {
    const peaks = [];
    for (let i = 1; i < prices.length - 1; i++) {
      if (prices[i] > prices[i - 1] && prices[i] > prices[i + 1]) {
        peaks.push({ index: i, value: prices[i] });
      }
    }
    return peaks;
  }
  
  // Find troughs in price data
  findTroughs(prices) {
    const troughs = [];
    for (let i = 1; i < prices.length - 1; i++) {
      if (prices[i] < prices[i - 1] && prices[i] < prices[i + 1]) {
        troughs.push({ index: i, value: prices[i] });
      }
    }
    return troughs;
  }
  
  // Identify current trend
  identifyTrend() {
    if (!this.indicators.sma20 || !this.indicators.sma50) {
      this.currentTrend = 'neutral';
      return;
    }
    
    const currentPrice = this.priceHistory[this.priceHistory.length - 1].price;
    
    if (currentPrice > this.indicators.sma20 && this.indicators.sma20 > this.indicators.sma50) {
      this.currentTrend = 'bullish';
    } else if (currentPrice < this.indicators.sma20 && this.indicators.sma20 < this.indicators.sma50) {
      this.currentTrend = 'bearish';
    } else {
      this.currentTrend = 'neutral';
    }
  }
  
  // Calculate prediction
  calculatePrediction() {
    const scores = {
      bullish: 0,
      bearish: 0,
      neutral: 0
    };
    
    // RSI Analysis
    if (this.indicators.rsi) {
      if (this.indicators.rsi < 30) scores.bullish += 2;
      else if (this.indicators.rsi > 70) scores.bearish += 2;
      else scores.neutral += 1;
    }
    
    // MACD Analysis
    if (this.indicators.histogram) {
      if (this.indicators.histogram > 0) scores.bullish += 1.5;
      else if (this.indicators.histogram < 0) scores.bearish += 1.5;
    }
    
    // Trend Analysis
    if (this.currentTrend === 'bullish') scores.bullish += 2;
    else if (this.currentTrend === 'bearish') scores.bearish += 2;
    else scores.neutral += 1;
    
    // Pattern Analysis
    this.patterns.forEach(pattern => {
      if (pattern.signal === 'bullish') scores.bullish += pattern.confidence * 2;
      else if (pattern.signal === 'bearish') scores.bearish += pattern.confidence * 2;
      else scores.neutral += pattern.confidence;
    });
    
    // Bollinger Bands Analysis
    const currentPrice = this.priceHistory[this.priceHistory.length - 1].price;
    if (this.indicators.bollingerUpper && this.indicators.bollingerLower) {
      if (currentPrice > this.indicators.bollingerUpper) scores.bearish += 1;
      else if (currentPrice < this.indicators.bollingerLower) scores.bullish += 1;
    }
    
    // Calculate final prediction
    const total = scores.bullish + scores.bearish + scores.neutral;
    const bullishProb = (scores.bullish / total) * 100;
    const bearishProb = (scores.bearish / total) * 100;
    const neutralProb = (scores.neutral / total) * 100;
    
    this.prediction = {
      direction: bullishProb > bearishProb ? (bullishProb > neutralProb ? 'CALL' : 'neutral') : (bearishProb > neutralProb ? 'PUT' : 'neutral'),
      confidence: Math.max(bullishProb, bearishProb, neutralProb) / 100,
      probabilities: {
        rise: bullishProb,
        fall: bearishProb,
        neutral: neutralProb
      },
      recommendation: this.getRecommendation(bullishProb, bearishProb, neutralProb),
      timestamp: Date.now()
    };
  }
  
  // Get trading recommendation
  getRecommendation(bullish, bearish, neutral) {
    const max = Math.max(bullish, bearish, neutral);
    
    if (max < 50) return 'wait';
    if (bullish === max && bullish > 60) return 'strong_buy';
    if (bullish === max && bullish > 50) return 'buy';
    if (bearish === max && bearish > 60) return 'strong_sell';
    if (bearish === max && bearish > 50) return 'sell';
    return 'hold';
  }
  
  // Get current analysis
  getAnalysis() {
    return {
      trend: this.currentTrend,
      indicators: this.indicators,
      patterns: this.patterns,
      prediction: this.prediction
    };
  }
  
  // Reset analysis
  reset() {
    this.priceHistory = [];
    this.currentTrend = 'neutral';
    this.patterns = [];
    this.indicators = {};
    this.prediction = null;
  }
}

// Create global instance
const analysisService = new AnalysisService();

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { AnalysisService, analysisService };
}
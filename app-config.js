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
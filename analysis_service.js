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
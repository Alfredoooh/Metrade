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
// ===== Advanced Chart Component =====

class ChartManager {
  constructor() {
    this.chart = null;
    this.chartData = [];
    this.maxDataPoints = 100;
    this.currentSymbol = null;
  }
  
  // Initialize chart
  initialize(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      Logger.error('Chart canvas not found');
      return;
    }
    
    const ctx = canvas.getContext('2d');
    
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Price',
          data: [],
          borderColor: APP_CONFIG.chart.colors.line,
          backgroundColor: 'rgba(103, 80, 164, 0.1)',
          borderWidth: 2,
          tension: 0.4,
          fill: true,
          pointRadius: 0,
          pointHoverRadius: 4,
          pointBackgroundColor: APP_CONFIG.chart.colors.line,
          pointBorderColor: '#fff',
          pointBorderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: true,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: APP_CONFIG.chart.colors.line,
            borderWidth: 1,
            padding: 12,
            displayColors: false,
            callbacks: {
              label: (context) => {
                return `Price: ${context.parsed.y.toFixed(5)}`;
              }
            }
          }
        },
        scales: {
          x: {
            display: true,
            grid: {
              display: false
            },
            ticks: {
              maxRotation: 0,
              autoSkipPadding: 20,
              color: '#938F99'
            }
          },
          y: {
            display: true,
            position: 'right',
            grid: {
              color: 'rgba(147, 143, 153, 0.1)'
            },
            ticks: {
              color: '#938F99',
              callback: (value) => value.toFixed(5)
            }
          }
        },
        animation: {
          duration: 300
        }
      }
    });
    
    Logger.info('Chart initialized');
  }
  
  // Update chart with tick data
  updateChart(tick) {
    if (!this.chart) return;
    
    const time = new Date(tick.epoch * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    
    this.chartData.push({
      time: time,
      price: tick.quote
    });
    
    if (this.chartData.length > this.maxDataPoints) {
      this.chartData.shift();
    }
    
    this.chart.data.labels = this.chartData.map(d => d.time);
    this.chart.data.datasets[0].data = this.chartData.map(d => d.price);
    
    this.chart.update('none');
  }
  
  // Clear chart
  clearChart() {
    if (!this.chart) return;
    
    this.chartData = [];
    this.chart.data.labels = [];
    this.chart.data.datasets[0].data = [];
    this.chart.update();
  }
  
  // Set symbol
  setSymbol(symbol) {
    this.currentSymbol = symbol;
    this.clearChart();
    Logger.info('Chart symbol changed', { symbol });
  }
  
  // Destroy chart
  destroy() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }
}

// Initialize chart manager
const ChartView = new ChartManager();

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ChartManager, ChartView };
}
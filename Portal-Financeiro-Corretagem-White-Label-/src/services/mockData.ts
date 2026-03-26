import type { Stock, MarketIndex, ChartDataPoint, PortfolioItem, Order, TimeRange } from '../types/market';
import { subDays, subHours, format } from 'date-fns';

// Mock Stocks
export const MOCK_STOCKS: Stock[] = [
  { symbol: 'PETR4', name: 'Petrobras PN', price: 34.50, change: 0.45, changePercent: 1.32, volume: 45000000, high: 34.80, low: 33.90, marketCap: 450000000000, sector: 'Energy' },
  { symbol: 'VALE3', name: 'Vale ON', price: 68.20, change: -1.20, changePercent: -1.73, volume: 25000000, high: 69.50, low: 67.80, marketCap: 320000000000, sector: 'Materials' },
  { symbol: 'ITUB4', name: 'Itaú Unibanco PN', price: 32.10, change: 0.15, changePercent: 0.47, volume: 18000000, high: 32.30, low: 31.80, marketCap: 280000000000, sector: 'Financials' },
  { symbol: 'BBDC4', name: 'Bradesco PN', price: 14.80, change: -0.05, changePercent: -0.34, volume: 22000000, high: 14.95, low: 14.70, marketCap: 150000000000, sector: 'Financials' },
  { symbol: 'WEGE3', name: 'WEG ON', price: 40.50, change: 1.20, changePercent: 3.05, volume: 5000000, high: 40.80, low: 39.10, marketCap: 170000000000, sector: 'Industrials' },
  { symbol: 'MGLU3', name: 'Magazine Luiza ON', price: 2.10, change: -0.10, changePercent: -4.55, volume: 55000000, high: 2.25, low: 2.05, marketCap: 14000000000, sector: 'Consumer Discretionary' },
  { symbol: 'RENT3', name: 'Localiza ON', price: 55.40, change: 0.80, changePercent: 1.47, volume: 4000000, high: 55.90, low: 54.20, marketCap: 58000000000, sector: 'Industrials' },
  { symbol: 'BBAS3', name: 'Banco do Brasil ON', price: 58.90, change: 0.30, changePercent: 0.51, volume: 8000000, high: 59.20, low: 58.10, marketCap: 168000000000, sector: 'Financials' },
];

// Mock Indices
export const MOCK_INDICES: MarketIndex[] = [
  { symbol: 'IBOV', name: 'IBOVESPA', value: 128500, change: 450, changePercent: 0.35 },
  { symbol: 'IFIX', name: 'IFIX', value: 3350, change: -5, changePercent: -0.15 },
  { symbol: 'USDBRL', name: 'Dólar Comercial', value: 4.95, change: -0.02, changePercent: -0.40 },
  { symbol: 'SPX', name: 'S&P 500', value: 5100, change: 25, changePercent: 0.49 },
];

// Mock Chart Data Generator
export const generateChartData = (baseValue: number, points: number, range: TimeRange): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  let currentValue = baseValue;
  
  for (let i = 0; i < points; i++) {
    const change = (Math.random() - 0.5) * (baseValue * 0.02); // 2% max volatility
    currentValue += change;
    
    let timeLabel = '';
    const now = new Date();
    
    switch (range) {
      case '1D':
        timeLabel = format(subHours(now, points - i), 'HH:mm');
        break;
      case '1W':
      case '1M':
        timeLabel = format(subDays(now, points - i), 'dd/MM');
        break;
      case '1Y':
        timeLabel = format(subDays(now, (points - i) * 7), 'MMM yy');
        break;
      default:
        timeLabel = i.toString();
    }

    data.push({
      time: timeLabel,
      value: currentValue,
      volume: Math.floor(Math.random() * 1000000)
    });
  }
  return data;
};

// Mock Portfolio
export const MOCK_PORTFOLIO: PortfolioItem[] = [
  { symbol: 'PETR4', quantity: 1000, averagePrice: 30.50, currentPrice: 34.50, totalValue: 34500, gainLoss: 4000, gainLossPercent: 13.11 },
  { symbol: 'VALE3', quantity: 500, averagePrice: 75.00, currentPrice: 68.20, totalValue: 34100, gainLoss: -3400, gainLossPercent: -9.07 },
  { symbol: 'WEGE3', quantity: 800, averagePrice: 32.00, currentPrice: 40.50, totalValue: 32400, gainLoss: 6800, gainLossPercent: 26.56 },
];

// Mock Orders
export const MOCK_ORDERS: Order[] = [
  { id: '1', symbol: 'PETR4', type: 'BUY', quantity: 1000, price: 30.50, status: 'EXECUTED', date: '2024-03-10 10:30' },
  { id: '2', symbol: 'VALE3', type: 'BUY', quantity: 500, price: 75.00, status: 'EXECUTED', date: '2024-02-15 14:20' },
  { id: '3', symbol: 'MGLU3', type: 'SELL', quantity: 2000, price: 2.50, status: 'EXECUTED', date: '2024-01-20 11:45' },
  { id: '4', symbol: 'WEGE3', type: 'BUY', quantity: 800, price: 32.00, status: 'EXECUTED', date: '2024-03-01 09:15' },
  { id: '5', symbol: 'BBAS3', type: 'BUY', quantity: 100, price: 58.00, status: 'PENDING', date: '2024-03-18 10:00' },
];

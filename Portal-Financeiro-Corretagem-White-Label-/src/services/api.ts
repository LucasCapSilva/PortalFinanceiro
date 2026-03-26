import axios from 'axios';
import type { Stock, MarketIndex, TimeRange, PortfolioItem, Order } from '../types/market';
import { AlphaVantageService } from './alphaVantage';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auto-login for demo purposes
const ensureAuth = async () => {
  if (!localStorage.getItem('token')) {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, {
        email: 'admin@portal.com',
        password: 'admin123',
      });
      localStorage.setItem('token', res.data.access_token);
    } catch (e) {
      console.error('Failed to auto-login', e);
    }
  }
};

export const MarketService = {
  getIndices: async (): Promise<MarketIndex[]> => {
    await ensureAuth();
    try {
      const { data } = await api.get('/market/indices');
      
      if (AlphaVantageService.isEnabled()) {
        try {
          const ibovData = await AlphaVantageService.getQuote('^BVSP');
          if (ibovData) {
            const realIbov: MarketIndex = {
              symbol: 'IBOV',
              name: 'IBOVESPA',
              value: ibovData.price,
              change: ibovData.change,
              changePercent: ibovData.changePercent
            };
            return [realIbov, ...data.filter((i: any) => i.symbol !== 'IBOV')];
          }
        } catch (error) {
          console.warn('Failed to fetch real IBOV data, using backend data', error);
        }
      }
      
      return data;
    } catch (e) {
      console.error('Error fetching indices', e);
      return [];
    }
  },

  getStocks: async (): Promise<Stock[]> => {
    await ensureAuth();
    try {
      const { data } = await api.get('/market/stocks');
      return data;
    } catch (e) {
      console.error('Error fetching stocks', e);
      return [];
    }
  },

  getStockDetails: async (symbol: string): Promise<Stock | undefined> => {
    await ensureAuth();
    if (AlphaVantageService.isEnabled()) {
      const realStock = await AlphaVantageService.getQuote(symbol);
      if (realStock) return realStock;
    }

    try {
      const { data } = await api.get(`/market/stocks/${symbol}`);
      return data;
    } catch (e) {
      console.error('Error fetching stock details', e);
      return undefined;
    }
  },

  getChartData: async (symbol: string, range: TimeRange) => {
    await ensureAuth();

    try {
      const { data } = await api.get(`/market/chart/${symbol}/${range}`);
      
      // Ensure we are returning an array, if not return empty array
      if (!Array.isArray(data)) {
        return [];
      }
      
      // For Recharts to work correctly, ensure value is a number
      return data.map(item => ({
        ...item,
        value: Number(item.value)
      }));
    } catch (e) {
      console.error('Error fetching chart data', e);
      return [];
    }
  },

  getPortfolio: async (): Promise<PortfolioItem[]> => {
    await ensureAuth();
    try {
      const { data } = await api.get('/portfolio');
      return data;
    } catch (e) {
      console.error('Error fetching portfolio', e);
      return [];
    }
  },

  getOrders: async (): Promise<Order[]> => {
    await ensureAuth();
    try {
      const { data } = await api.get('/orders');
      return data;
    } catch (e) {
      console.error('Error fetching orders', e);
      return [];
    }
  },

  placeOrder: async (orderData: { symbol: string; type: 'BUY' | 'SELL'; quantity: number; price: number }): Promise<Order | null> => {
    await ensureAuth();
    try {
      const { data } = await api.post('/orders', orderData);
      return data;
    } catch (e) {
      console.error('Error placing order', e);
      return null;
    }
  }
};

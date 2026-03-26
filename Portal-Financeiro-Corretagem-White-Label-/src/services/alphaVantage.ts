import axios from 'axios';
import type { GlobalQuoteResponse, TimeSeriesDailyResponse, SearchEndpointResponse } from '../types/alphaVantage';
import type { Stock, ChartDataPoint } from '../types/market';
import { format } from 'date-fns';

const API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_KEY;
const BASE_URL = 'https://www.alphavantage.co/query';
let hasLoggedWarning = false;

// Simple in-memory cache to prevent hitting rate limits too fast
const cache: Record<string, { data: unknown; timestamp: number }> = {};
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

export const AlphaVantageService = {
  isEnabled: () => {
    const enabled = !!API_KEY && API_KEY !== 'demo';
    if (!enabled && !hasLoggedWarning) {
      console.info('Alpha Vantage API key not found or set to "demo". Using mock data. Set VITE_ALPHA_VANTAGE_KEY in .env to enable real data.');
      hasLoggedWarning = true;
    }
    return enabled;
  },

  async getQuote(symbol: string): Promise<Stock | undefined> {
    if (!this.isEnabled()) return undefined;

    const cacheKey = `quote_${symbol}`;
    if (cache[cacheKey] && Date.now() - cache[cacheKey].timestamp < CACHE_DURATION) {
      return cache[cacheKey].data as Stock;
    }

    try {
      const response = await axios.get<GlobalQuoteResponse>(BASE_URL, {
        params: {
          function: 'GLOBAL_QUOTE',
          symbol: symbol,
          apikey: API_KEY,
        },
      });

      const data = response.data['Global Quote'];
      if (!data || !data['01. symbol']) return undefined;

      const stock: Stock = {
        symbol: data['01. symbol'],
        name: symbol, // API doesn't return name in Quote endpoint, would need Search endpoint
        price: parseFloat(data['05. price']),
        change: parseFloat(data['09. change']),
        changePercent: parseFloat(data['10. change percent'].replace('%', '')),
        volume: parseInt(data['06. volume']),
        high: parseFloat(data['03. high']),
        low: parseFloat(data['04. low']),
        marketCap: 0, // Not available in Quote
        sector: 'Unknown', // Not available in Quote
      };

      cache[cacheKey] = { data: stock, timestamp: Date.now() };
      return stock;
    } catch (error) {
      console.error(`AlphaVantage API Error (Quote ${symbol}):`, error);
      return undefined;
    }
  },

  async getDailySeries(symbol: string): Promise<ChartDataPoint[] | undefined> {
    if (!this.isEnabled()) return undefined;

    const cacheKey = `daily_${symbol}`;
    if (cache[cacheKey] && Date.now() - cache[cacheKey].timestamp < CACHE_DURATION) {
      return cache[cacheKey].data as ChartDataPoint[];
    }

    try {
      const response = await axios.get<TimeSeriesDailyResponse>(BASE_URL, {
        params: {
          function: 'TIME_SERIES_DAILY',
          symbol: symbol,
          apikey: API_KEY,
        },
      });

      const timeSeries = response.data['Time Series (Daily)'];
      if (!timeSeries) return undefined;

      const chartData: ChartDataPoint[] = Object.entries(timeSeries)
        .slice(0, 30) // Last 30 days
        .map(([date, values]) => ({
          time: format(new Date(date), 'dd/MM'),
          value: parseFloat(values['4. close']),
          volume: parseInt(values['5. volume']),
        }))
        .reverse();

      cache[cacheKey] = { data: chartData, timestamp: Date.now() };
      return chartData;
    } catch (error) {
      console.error(`AlphaVantage API Error (Daily ${symbol}):`, error);
      return undefined;
    }
  },

  async searchSymbol(keywords: string): Promise<SearchEndpointResponse['bestMatches'] | undefined> {
    if (!this.isEnabled()) return undefined;
    
    try {
      const response = await axios.get<SearchEndpointResponse>(BASE_URL, {
        params: {
          function: 'SYMBOL_SEARCH',
          keywords: keywords,
          apikey: API_KEY,
        },
      });
      return response.data.bestMatches;
    } catch (error) {
      console.error(`AlphaVantage API Error (Search ${keywords}):`, error);
      return undefined;
    }
  }
};

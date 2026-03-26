import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { IndexCard } from '../components/dashboard/IndexCard';
import { MarketOverviewChart } from '../components/dashboard/MarketOverviewChart';
import { TopMovers } from '../components/dashboard/TopMovers';
import { MarketService } from '../services/api';
import type { MarketIndex, Stock } from '../types/market';

const Dashboard = () => {
  const [indices, setIndices] = useState<MarketIndex[]>([]);
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [indicesData, stocksData] = await Promise.all([
          MarketService.getIndices(),
          MarketService.getStocks()
        ]);
        setIndices(indicesData);
        setStocks(stocksData);
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
        setError('Não foi possível carregar os dados do dashboard.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <div className="text-red-500 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-alert-circle"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Erro</h2>
        <p className="text-gray-500 dark:text-gray-400">{error}</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">Visão geral do mercado hoje</p>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
          Última atualização: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Indices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {indices.map((index) => (
          <IndexCard key={index.symbol} index={index} />
        ))}
      </div>

      {/* Main Chart & Top Movers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 min-h-[320px] md:min-h-[380px]">
          <MarketOverviewChart />
        </div>
        <div className="min-h-[320px]">
          <TopMovers stocks={stocks} />
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;

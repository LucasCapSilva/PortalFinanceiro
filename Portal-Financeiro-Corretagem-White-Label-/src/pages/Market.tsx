import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { MarketService } from '../services/api';
import type { Stock } from '../types/market';
import clsx from 'clsx';

import { useNavigate } from 'react-router-dom';

const Market = () => {
  const navigate = useNavigate();
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [filteredStocks, setFilteredStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Stock; direction: 'asc' | 'desc' } | null>(null);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const data = await MarketService.getStocks();
        setStocks(data);
        setFilteredStocks(data);
      } catch (error) {
        console.error('Failed to fetch stocks', error);
        setError('Não foi possível carregar os dados do mercado.');
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  useEffect(() => {
    let result = [...stocks];

    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter(
        (stock) =>
          stock.symbol.toLowerCase().includes(lowerTerm) ||
          stock.name.toLowerCase().includes(lowerTerm)
      );
    }

    if (sortConfig) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredStocks(result);
  }, [stocks, searchTerm, sortConfig]);

  const handleSort = (key: keyof Stock) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const SortIcon = ({ columnKey }: { columnKey: keyof Stock }) => {
    if (sortConfig?.key !== columnKey) return <ArrowUpDown size={14} className="text-gray-400" />;
    return sortConfig.direction === 'asc' ? <ArrowUp size={14} className="text-brand-500" /> : <ArrowDown size={14} className="text-brand-500" />;
  };

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
        <div className="text-red-500 mb-4"><Search size={48} /></div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Erro</h2>
        <p className="text-gray-500 dark:text-gray-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mercado de Ações</h1>
          <p className="text-gray-500 dark:text-gray-400">Explore e negocie os principais ativos</p>
        </div>
      </div>

      <div className="glass-card p-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
          <div className="relative flex-1 sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Buscar por símbolo ou nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-brand-500 transition-all outline-none"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors sm:w-auto w-full">
            <Filter size={18} />
            <span>Filtros</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px]">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:text-brand-500 transition-colors" onClick={() => handleSort('symbol')}>
                  <div className="flex items-center gap-2">Ativo <SortIcon columnKey="symbol" /></div>
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:text-brand-500 transition-colors" onClick={() => handleSort('name')}>
                  <div className="flex items-center gap-2">Nome <SortIcon columnKey="name" /></div>
                </th>
                <th className="text-right py-3 px-4 font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:text-brand-500 transition-colors" onClick={() => handleSort('price')}>
                  <div className="flex items-center justify-end gap-2">Preço <SortIcon columnKey="price" /></div>
                </th>
                <th className="text-right py-3 px-4 font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:text-brand-500 transition-colors" onClick={() => handleSort('changePercent')}>
                  <div className="flex items-center justify-end gap-2">Variação <SortIcon columnKey="changePercent" /></div>
                </th>
                <th className="text-right py-3 px-4 font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:text-brand-500 transition-colors" onClick={() => handleSort('volume')}>
                  <div className="flex items-center justify-end gap-2">Volume <SortIcon columnKey="volume" /></div>
                </th>
                <th className="text-right py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Ação</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredStocks.map((stock) => {
                   const isPositive = Number(stock.changePercent) >= 0;
                   return (
                    <motion.tr
                      key={stock.symbol}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                    >
                      <td className="py-4 px-4 font-bold text-gray-900 dark:text-white">{stock.symbol}</td>
                      <td className="py-4 px-4 text-gray-600 dark:text-gray-300">{stock.name}</td>
                      <td className="py-4 px-4 text-right font-medium text-gray-900 dark:text-white">
                        {Number(stock.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className={clsx(
                          "inline-flex items-center px-2 py-1 rounded-full text-xs font-bold",
                          isPositive ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
                        )}>
                          {isPositive ? '+' : ''}{Number(stock.changePercent).toFixed(2)}%
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right text-gray-600 dark:text-gray-400">
                        {(Number(stock.volume) / 1000000).toFixed(1)}M
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button 
                          onClick={() => navigate(`/orders?ticker=${stock.symbol}`)}
                          className="px-3 py-1 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                          Negociar
                        </button>
                      </td>
                    </motion.tr>
                   );
                })}
              </AnimatePresence>
            </tbody>
          </table>
          {filteredStocks.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              Nenhum ativo encontrado.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Market;

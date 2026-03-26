import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { Wallet, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { MarketService } from '../services/api';
import type { PortfolioItem } from '../types/market';
import clsx from 'clsx';

const COLORS = ['#0ea5e9', '#22c55e', '#eab308', '#f97316', '#ef4444', '#8b5cf6'];

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const data = await MarketService.getPortfolio();
        setPortfolio(data);
      } catch (error) {
        console.error('Failed to fetch portfolio', error);
        setError('Não foi possível carregar o portfólio.');
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  const totalValue = portfolio.reduce((acc, item) => acc + Number(item.totalValue), 0);
  const totalGainLoss = portfolio.reduce((acc, item) => acc + Number(item.gainLoss), 0);
  const totalGainLossPercent = (totalGainLoss / (totalValue - totalGainLoss)) * 100;

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
        <div className="text-red-500 mb-4"><DollarSign size={48} /></div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Erro</h2>
        <p className="text-gray-500 dark:text-gray-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Minha Carteira</h1>
          <p className="text-gray-500 dark:text-gray-400">Gerencie seus investimentos</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 flex items-center gap-4"
        >
          <div className="p-3 bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 rounded-xl">
            <Wallet size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Patrimônio Total</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 flex items-center gap-4"
        >
          <div className={clsx(
            "p-3 rounded-xl",
            totalGainLoss >= 0 
              ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400" 
              : "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
          )}>
            {totalGainLoss >= 0 ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Lucro/Prejuízo Total</p>
            <p className={clsx(
              "text-2xl font-bold",
              totalGainLoss >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
            )}>
              {totalGainLoss >= 0 ? '+' : ''}{totalGainLoss.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 flex items-center gap-4"
        >
          <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Rentabilidade</p>
            <p className={clsx(
              "text-2xl font-bold",
              totalGainLossPercent >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
            )}>
              {totalGainLossPercent >= 0 ? '+' : ''}{totalGainLossPercent.toFixed(2)}%
            </p>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Allocation Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-4 sm:p-5 md:p-6 min-h-[320px] sm:min-h-[360px] md:min-h-[400px] flex flex-col"
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Alocação de Ativos</h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={portfolio}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="totalValue"
                  nameKey="symbol"
                >
                  {portfolio.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                   formatter={(value: unknown) => Number((Array.isArray(value) ? value[0] : value) ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                   contentStyle={{ 
                     backgroundColor: 'var(--bg-card)', 
                     borderColor: 'rgb(var(--color-secondary-200))',
                     backdropFilter: 'blur(8px)',
                     borderRadius: '12px',
                     boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                     color: 'currentColor'
                   }}
                   itemStyle={{ fontWeight: 'bold' }}
                />
                <Legend formatter={(value) => <span className="text-gray-700 dark:text-gray-300 font-medium">{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Asset List */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-4 sm:p-5 md:p-6 lg:col-span-2 overflow-x-auto"
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Seus Ativos</h3>
          <table className="w-full min-w-[760px]">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                <th className="pb-3 pl-2">Ativo</th>
                <th className="pb-3 text-right">Qtd</th>
                <th className="pb-3 text-right">Preço Médio</th>
                <th className="pb-3 text-right">Preço Atual</th>
                <th className="pb-3 text-right">Valor Total</th>
                <th className="pb-3 text-right">Resultado</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.map((item) => {
                const isPositive = Number(item.gainLoss) >= 0;
                return (
                  <tr key={item.symbol} className="border-b border-gray-100 dark:border-gray-800/50 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="py-4 pl-2 font-bold text-gray-900 dark:text-white">{item.symbol}</td>
                    <td className="py-4 text-right text-gray-600 dark:text-gray-300">{item.quantity}</td>
                    <td className="py-4 text-right text-gray-600 dark:text-gray-300">
                      {Number(item.averagePrice).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </td>
                    <td className="py-4 text-right text-gray-600 dark:text-gray-300">
                      {Number(item.currentPrice).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </td>
                    <td className="py-4 text-right font-medium text-gray-900 dark:text-white">
                      {Number(item.totalValue).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </td>
                    <td className="py-4 text-right">
                      <div className={clsx(
                        "text-sm font-bold",
                        isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                      )}>
                        {isPositive ? '+' : ''}{Number(item.gainLoss).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </div>
                      <div className={clsx(
                        "text-xs",
                        isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                      )}>
                        ({isPositive ? '+' : ''}{Number(item.gainLossPercent).toFixed(2)}%)
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
};

export default Portfolio;

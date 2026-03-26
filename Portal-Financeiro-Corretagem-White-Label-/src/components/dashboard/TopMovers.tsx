import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';
import clsx from 'clsx';
import type { Stock } from '../../types/market';

interface TopMoversProps {
  stocks: Stock[];
}

export const TopMovers = ({ stocks }: TopMoversProps) => {
  // Sort by absolute change percent
  const sortedStocks = [...stocks].sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent)).slice(0, 5);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-card p-6 h-full"
    >
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="text-brand-500" size={20} />
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Destaques do Dia</h3>
      </div>

      <div className="space-y-4">
        {sortedStocks.map((stock, index) => {
          const isPositive = stock.changePercent >= 0;
          return (
            <motion.div 
              key={stock.symbol}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors group cursor-pointer"
            >
              <div>
                <div className="font-bold text-gray-900 dark:text-white group-hover:text-brand-500 transition-colors">
                  {stock.symbol}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[120px]">
                  {stock.name}
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-medium text-gray-900 dark:text-white">
                  {Number(stock.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </div>
                <div className={clsx(
                  "text-xs font-bold flex items-center justify-end gap-1",
                  isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                )}>
                  {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {Math.abs(Number(stock.changePercent)).toFixed(2)}%
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

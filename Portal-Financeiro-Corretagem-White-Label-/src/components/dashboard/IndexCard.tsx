import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import clsx from 'clsx';
import type { MarketIndex } from '../../types/market';

interface IndexCardProps {
  index: MarketIndex;
}

export const IndexCard = ({ index }: IndexCardProps) => {
  const isPositive = Number(index.change) >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-4 flex flex-col justify-between hover:shadow-xl transition-shadow"
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
          {index.name}
        </span>
        <span className={clsx(
          "flex items-center text-xs font-bold px-2 py-1 rounded-full",
          isPositive 
            ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400" 
            : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
        )}>
          {isPositive ? <ArrowUpRight size={12} className="mr-1" /> : <ArrowDownRight size={12} className="mr-1" />}
          {Number(index.changePercent).toFixed(2)}%
        </span>
      </div>
      
      <div className="flex items-end gap-2">
        <span className="text-2xl font-bold text-gray-900 dark:text-white">
          {Number(index.value).toLocaleString('pt-BR')}
        </span>
        <span className={clsx(
          "text-sm mb-1",
          isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
        )}>
          {isPositive ? '+' : ''}{Number(index.change).toFixed(2)}
        </span>
      </div>
    </motion.div>
  );
};

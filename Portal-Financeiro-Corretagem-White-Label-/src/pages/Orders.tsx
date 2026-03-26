import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, CheckCircle, XCircle, Clock, ArrowRightLeft } from 'lucide-react';
import { MarketService } from '../services/api';
import type { Order, Stock } from '../types/market';
import clsx from 'clsx';

import { useSearchParams } from 'react-router-dom';

const Orders = () => {
  const [searchParams] = useSearchParams();
  const initialTicker = searchParams.get('ticker') || '';
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStock, setSelectedStock] = useState(initialTicker);
  const [orderType, setOrderType] = useState<'BUY' | 'SELL'>('BUY');
  const [quantity, setQuantity] = useState(100);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersData, stocksData] = await Promise.all([
          MarketService.getOrders(),
          MarketService.getStocks()
        ]);
        setOrders(ordersData);
        setStocks(stocksData);
        
        if (stocksData.length > 0) {
          const targetStock = initialTicker 
            ? stocksData.find(s => s.symbol === initialTicker) || stocksData[0]
            : stocksData[0];
            
          setSelectedStock(targetStock.symbol);
          setPrice(targetStock.price);
        }
      } catch (error) {
        console.error('Failed to fetch data', error);
        setError('Não foi possível carregar os dados. Verifique a conexão com o servidor.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [initialTicker]);

  const handleStockChange = (symbol: string) => {
    setSelectedStock(symbol);
    const stock = stocks.find(s => s.symbol === symbol);
    if (stock) {
      setPrice(stock.price);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const orderData = {
      symbol: selectedStock,
      type: orderType,
      quantity,
      price,
    };
    
    try {
      const savedOrder = await MarketService.placeOrder(orderData);
      if (savedOrder) {
        setOrders([savedOrder, ...orders]);
        alert(`Ordem de ${orderType === 'BUY' ? 'Compra' : 'Venda'} enviada com sucesso!`);
      } else {
        alert('Erro ao enviar ordem. Tente novamente.');
      }
    } catch (error) {
      console.error('Error placing order', error);
      alert('Erro ao enviar ordem. Tente novamente.');
    }
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
        <div className="text-red-500 mb-4"><XCircle size={48} /></div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Erro</h2>
        <p className="text-gray-500 dark:text-gray-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Ordens & Negociação</h1>
          <p className="text-gray-500 dark:text-gray-400">Envie ordens e acompanhe suas operações</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Form */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-6 h-fit"
        >
          <div className="flex items-center gap-2 mb-6">
            <ArrowRightLeft className="text-brand-500" size={24} />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Nova Ordem</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ativo</label>
              <select 
                value={selectedStock}
                onChange={(e) => handleStockChange(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
              >
                {stocks.map(stock => (
                  <option key={stock.symbol} value={stock.symbol}>{stock.symbol} - {stock.name}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <button
                type="button"
                onClick={() => setOrderType('BUY')}
                className={clsx(
                  "flex-1 py-2 rounded-md text-sm font-bold transition-all",
                  orderType === 'BUY' 
                    ? "bg-green-500 text-white shadow-md" 
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                )}
              >
                Compra
              </button>
              <button
                type="button"
                onClick={() => setOrderType('SELL')}
                className={clsx(
                  "flex-1 py-2 rounded-md text-sm font-bold transition-all",
                  orderType === 'SELL' 
                    ? "bg-red-500 text-white shadow-md" 
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                )}
              >
                Venda
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Quantidade</label>
                <input 
                  type="number" 
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  min="1"
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Preço (R$)</label>
                <input 
                  type="number" 
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  step="0.01"
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between mb-2 text-sm">
                <span className="text-gray-500 dark:text-gray-400">Total Estimado</span>
                <span className="font-bold text-gray-900 dark:text-white">
                  {(quantity * price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
              </div>
              <button 
                type="submit"
                className={clsx(
                  "w-full py-3 rounded-xl text-white font-bold shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]",
                  orderType === 'BUY' ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                )}
              >
                Confirmar {orderType === 'BUY' ? 'Compra' : 'Venda'}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Orders History */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 lg:col-span-2 overflow-hidden flex flex-col"
        >
          <div className="flex items-center gap-2 mb-6">
            <ShoppingCart className="text-brand-500" size={24} />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Histórico de Ordens</h3>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full min-w-[720px]">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  <th className="pb-3 pl-2">Data</th>
                  <th className="pb-3">Ativo</th>
                  <th className="pb-3">Tipo</th>
                  <th className="pb-3 text-right">Qtd</th>
                  <th className="pb-3 text-right">Preço</th>
                  <th className="pb-3 text-right">Total</th>
                  <th className="pb-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                   const isBuy = order.type === 'BUY';
                   return (
                    <tr key={order.id} className="border-b border-gray-100 dark:border-gray-800/50 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                      <td className="py-4 pl-2 text-gray-600 dark:text-gray-300 text-sm">
                        {new Date(order.date).toLocaleDateString()} <span className="text-xs text-gray-400">{new Date(order.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                      </td>
                      <td className="py-4 font-bold text-gray-900 dark:text-white">{order.symbol}</td>
                      <td className="py-4">
                        <span className={clsx(
                          "px-2 py-1 rounded text-xs font-bold",
                          isBuy ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
                        )}>
                          {isBuy ? 'COMPRA' : 'VENDA'}
                        </span>
                      </td>
                      <td className="py-4 text-right text-gray-600 dark:text-gray-300">{order.quantity}</td>
                      <td className="py-4 text-right text-gray-600 dark:text-gray-300">
                        {Number(order.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </td>
                      <td className="py-4 text-right font-medium text-gray-900 dark:text-white">
                        {(order.quantity * Number(order.price)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </td>
                      <td className="py-4 text-center">
                        <div className="flex items-center justify-center">
                          {order.status === 'EXECUTED' && <CheckCircle size={18} className="text-green-500" />}
                          {order.status === 'PENDING' && <Clock size={18} className="text-yellow-500" />}
                          {order.status === 'CANCELLED' && <XCircle size={18} className="text-red-500" />}
                        </div>
                      </td>
                    </tr>
                   );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Orders;

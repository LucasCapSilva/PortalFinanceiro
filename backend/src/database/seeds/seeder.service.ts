import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { StockEntity } from '../../modules/market/infrastructure/entities/stock.entity';
import { MarketIndexEntity } from '../../modules/market/infrastructure/entities/market-index.entity';
import { UserEntity } from '../../modules/users/infrastructure/entities/user.entity';
import { PortfolioItemEntity } from '../../modules/portfolio/infrastructure/entities/portfolio-item.entity';
import { OrderEntity } from '../../modules/orders/infrastructure/entities/order.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeederService {
  private readonly logger = new Logger(SeederService.name);

  constructor(private readonly dataSource: DataSource) {}

  async seed() {
    this.logger.log('Checking database seed...');
    
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    
    try {
      // Seed Users
      const userRepo = this.dataSource.getRepository(UserEntity);
      const adminCount = await userRepo.count({ where: { email: 'admin@portal.com' } });
      
      let userId = 1;
      if (adminCount === 0) {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        const user = userRepo.create({
          name: 'Admin',
          email: 'admin@portal.com',
          password: hashedPassword,
        });
        const savedUser = await userRepo.save(user);
        userId = savedUser.id;
        this.logger.log('Admin user seeded.');
      } else {
        const user = await userRepo.findOne({ where: { email: 'admin@portal.com' } });
        userId = user?.id || 1;
      }

      // Seed Stocks
      const stockRepo = this.dataSource.getRepository(StockEntity);
      const stockCount = await stockRepo.count();
      if (stockCount === 0) {
        const stocks = [
          { symbol: 'PETR4', name: 'Petrobras PN', price: 34.50, change: 0.45, changePercent: 1.32, volume: 45000000, high: 34.80, low: 33.90, marketCap: 450000000000, sector: 'Energy' },
          { symbol: 'VALE3', name: 'Vale ON', price: 68.20, change: -1.20, changePercent: -1.73, volume: 25000000, high: 69.50, low: 67.80, marketCap: 320000000000, sector: 'Materials' },
          { symbol: 'ITUB4', name: 'Itaú Unibanco PN', price: 32.10, change: 0.15, changePercent: 0.47, volume: 18000000, high: 32.30, low: 31.80, marketCap: 280000000000, sector: 'Financials' },
          { symbol: 'BBDC4', name: 'Bradesco PN', price: 14.80, change: -0.05, changePercent: -0.34, volume: 22000000, high: 14.95, low: 14.70, marketCap: 150000000000, sector: 'Financials' },
          { symbol: 'WEGE3', name: 'WEG ON', price: 40.50, change: 1.20, changePercent: 3.05, volume: 5000000, high: 40.80, low: 39.10, marketCap: 170000000000, sector: 'Industrials' },
          { symbol: 'MGLU3', name: 'Magazine Luiza ON', price: 2.10, change: -0.10, changePercent: -4.55, volume: 55000000, high: 2.25, low: 2.05, marketCap: 14000000000, sector: 'Consumer Discretionary' },
          { symbol: 'RENT3', name: 'Localiza ON', price: 55.40, change: 0.80, changePercent: 1.47, volume: 4000000, high: 55.90, low: 54.20, marketCap: 58000000000, sector: 'Industrials' },
          { symbol: 'BBAS3', name: 'Banco do Brasil ON', price: 58.90, change: 0.30, changePercent: 0.51, volume: 8000000, high: 59.20, low: 58.10, marketCap: 168000000000, sector: 'Financials' },
        ];
        await stockRepo.save(stocks);
        this.logger.log('Stocks seeded.');
      }

      // Seed Indices
      const indexRepo = this.dataSource.getRepository(MarketIndexEntity);
      const indexCount = await indexRepo.count();
      if (indexCount === 0) {
        const indices = [
          { symbol: 'IBOV', name: 'IBOVESPA', value: 128500, change: 450, changePercent: 0.35 },
          { symbol: 'IFIX', name: 'IFIX', value: 3350, change: -5, changePercent: -0.15 },
          { symbol: 'USDBRL', name: 'Dólar Comercial', value: 4.95, change: -0.02, changePercent: -0.40 },
          { symbol: 'SPX', name: 'S&P 500', value: 5100, change: 25, changePercent: 0.49 },
        ];
        await indexRepo.save(indices);
        this.logger.log('Indices seeded.');
      }

      // Seed Portfolio
      const portfolioRepo = this.dataSource.getRepository(PortfolioItemEntity);
      const portfolioCount = await portfolioRepo.count();
      if (portfolioCount === 0) {
        const items = [
          { userId, symbol: 'PETR4', quantity: 1000, averagePrice: 30.50, currentPrice: 34.50, totalValue: 34500, gainLoss: 4000, gainLossPercent: 13.11 },
          { userId, symbol: 'VALE3', quantity: 500, averagePrice: 75.00, currentPrice: 68.20, totalValue: 34100, gainLoss: -3400, gainLossPercent: -9.07 },
          { userId, symbol: 'WEGE3', quantity: 800, averagePrice: 32.00, currentPrice: 40.50, totalValue: 32400, gainLoss: 6800, gainLossPercent: 26.56 },
        ];
        await portfolioRepo.save(items);
        this.logger.log('Portfolio seeded.');
      }

      // Seed Orders
      const orderRepo = this.dataSource.getRepository(OrderEntity);
      const orderCount = await orderRepo.count();
      if (orderCount === 0) {
        const orders = [
          { userId, symbol: 'PETR4', type: 'BUY', quantity: 1000, price: 30.50, status: 'EXECUTED', date: new Date('2024-03-10T10:30:00Z') },
          { userId, symbol: 'VALE3', type: 'BUY', quantity: 500, price: 75.00, status: 'EXECUTED', date: new Date('2024-02-15T14:20:00Z') },
          { userId, symbol: 'MGLU3', type: 'SELL', quantity: 2000, price: 2.50, status: 'EXECUTED', date: new Date('2024-01-20T11:45:00Z') },
          { userId, symbol: 'WEGE3', type: 'BUY', quantity: 800, price: 32.00, status: 'EXECUTED', date: new Date('2024-03-01T09:15:00Z') },
          { userId, symbol: 'BBAS3', type: 'BUY', quantity: 100, price: 58.00, status: 'PENDING', date: new Date('2024-03-18T10:00:00Z') },
        ];
        await orderRepo.save(orders);
        this.logger.log('Orders seeded.');
      }

    } catch (error) {
      this.logger.error('Error seeding database', error);
    } finally {
      await queryRunner.release();
    }
  }
}

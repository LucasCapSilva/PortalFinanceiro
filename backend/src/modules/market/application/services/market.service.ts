import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StockEntity } from '../../infrastructure/entities/stock.entity';
import { MarketIndexEntity } from '../../infrastructure/entities/market-index.entity';

@Injectable()
export class MarketService {
  constructor(
    @InjectRepository(StockEntity)
    private readonly stockRepository: Repository<StockEntity>,
    @InjectRepository(MarketIndexEntity)
    private readonly marketIndexRepository: Repository<MarketIndexEntity>,
  ) {}

  async getStocks(): Promise<StockEntity[]> {
    return this.stockRepository.find();
  }

  async getStockBySymbol(symbol: string): Promise<StockEntity | null> {
    return this.stockRepository.findOne({ where: { symbol } });
  }

  async getIndices(): Promise<MarketIndexEntity[]> {
    return this.marketIndexRepository.find();
  }
}

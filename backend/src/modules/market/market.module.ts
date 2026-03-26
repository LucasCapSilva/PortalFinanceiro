import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockEntity } from './infrastructure/entities/stock.entity';
import { MarketIndexEntity } from './infrastructure/entities/market-index.entity';
import { MarketService } from './application/services/market.service';
import { MarketController } from './presentation/controllers/market.controller';

@Module({
  imports: [TypeOrmModule.forFeature([StockEntity, MarketIndexEntity])],
  controllers: [MarketController],
  providers: [MarketService],
  exports: [MarketService],
})
export class MarketModule {}

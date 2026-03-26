import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioItemEntity } from './infrastructure/entities/portfolio-item.entity';
import { PortfolioService } from './application/services/portfolio.service';
import { PortfolioController } from './presentation/controllers/portfolio.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PortfolioItemEntity])],
  controllers: [PortfolioController],
  providers: [PortfolioService],
  exports: [PortfolioService],
})
export class PortfolioModule {}

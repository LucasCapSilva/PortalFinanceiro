import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PortfolioItemEntity } from '../../infrastructure/entities/portfolio-item.entity';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(PortfolioItemEntity)
    private readonly portfolioRepository: Repository<PortfolioItemEntity>,
  ) {}

  async getPortfolioByUser(userId: number): Promise<PortfolioItemEntity[]> {
    return this.portfolioRepository.find({ where: { userId } });
  }

  async getPortfolioSummary(userId: number) {
    const items = await this.getPortfolioByUser(userId);
    const totalValue = items.reduce((sum, item) => sum + Number(item.totalValue), 0);
    const totalGainLoss = items.reduce((sum, item) => sum + Number(item.gainLoss), 0);
    const totalInvested = totalValue - totalGainLoss;
    const gainLossPercent = totalInvested > 0 ? (totalGainLoss / totalInvested) * 100 : 0;

    return {
      totalValue,
      totalGainLoss,
      gainLossPercent,
      items,
    };
  }
}

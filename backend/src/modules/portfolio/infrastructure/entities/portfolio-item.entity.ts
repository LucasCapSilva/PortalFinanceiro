import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '../../../users/infrastructure/entities/user.entity';

@Entity('portfolio_items')
export class PortfolioItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column({ length: 10 })
  symbol: string;

  @Column('int')
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  averagePrice: number;

  @Column('decimal', { precision: 10, scale: 2 })
  currentPrice: number;

  @Column('decimal', { precision: 15, scale: 2 })
  totalValue: number;

  @Column('decimal', { precision: 15, scale: 2 })
  gainLoss: number;

  @Column('decimal', { precision: 10, scale: 2 })
  gainLossPercent: number;
}

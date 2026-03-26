import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('market_indices')
export class MarketIndexEntity {
  @PrimaryColumn({ length: 10 })
  symbol: string;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  value: number;

  @Column('decimal', { precision: 10, scale: 2 })
  change: number;

  @Column('decimal', { precision: 10, scale: 2 })
  changePercent: number;
}

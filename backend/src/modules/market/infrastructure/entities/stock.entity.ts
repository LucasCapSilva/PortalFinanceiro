import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('stocks')
export class StockEntity {
  @PrimaryColumn({ length: 10 })
  symbol: string;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('decimal', { precision: 10, scale: 2 })
  change: number;

  @Column('decimal', { precision: 10, scale: 2 })
  changePercent: number;

  @Column('bigint')
  volume: number;

  @Column('decimal', { precision: 10, scale: 2 })
  high: number;

  @Column('decimal', { precision: 10, scale: 2 })
  low: number;

  @Column('bigint')
  marketCap: number;

  @Column()
  sector: string;
}

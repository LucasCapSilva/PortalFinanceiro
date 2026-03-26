import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { UserEntity } from '../../../users/infrastructure/entities/user.entity';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column({ length: 10 })
  symbol: string;

  @Column({ type: 'enum', enum: ['BUY', 'SELL'] })
  type: string;

  @Column('int')
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'enum', enum: ['PENDING', 'EXECUTED', 'CANCELLED'], default: 'PENDING' })
  status: string;

  @CreateDateColumn()
  date: Date;
}

import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetOrdersQuery } from './get-orders.query';
import { OrderEntity } from '../../infrastructure/entities/order.entity';

@QueryHandler(GetOrdersQuery)
export class GetOrdersHandler implements IQueryHandler<GetOrdersQuery> {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  async execute(query: GetOrdersQuery) {
    return this.orderRepository.find({
      where: { userId: query.userId },
      order: { date: 'DESC' },
    });
  }
}

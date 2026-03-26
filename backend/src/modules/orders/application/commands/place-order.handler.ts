import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlaceOrderCommand } from './place-order.command';
import { OrderEntity } from '../../infrastructure/entities/order.entity';

@CommandHandler(PlaceOrderCommand)
export class PlaceOrderHandler implements ICommandHandler<PlaceOrderCommand> {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  async execute(command: PlaceOrderCommand) {
    const order = this.orderRepository.create({
      userId: command.userId,
      symbol: command.symbol,
      type: command.type,
      quantity: command.quantity,
      price: command.price,
      status: 'PENDING',
    });

    return this.orderRepository.save(order);
  }
}

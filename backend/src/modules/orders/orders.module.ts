import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { OrderEntity } from './infrastructure/entities/order.entity';
import { OrdersController } from './presentation/controllers/orders.controller';
import { PlaceOrderHandler } from './application/commands/place-order.handler';
import { GetOrdersHandler } from './application/queries/get-orders.handler';

const CommandHandlers = [PlaceOrderHandler];
const QueryHandlers = [GetOrdersHandler];

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity]),
    CqrsModule,
  ],
  controllers: [OrdersController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class OrdersModule {}

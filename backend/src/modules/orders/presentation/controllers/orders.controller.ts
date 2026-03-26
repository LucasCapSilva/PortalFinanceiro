import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../../auth/decorators/current-user.decorator';
import { CreateOrderDto } from '../dto/create-order.dto';
import { PlaceOrderCommand } from '../../application/commands/place-order.command';
import { GetOrdersQuery } from '../../application/queries/get-orders.query';

@ApiTags('Orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Place a new order' })
  async placeOrder(@CurrentUser() user: any, @Body() dto: CreateOrderDto) {
    return this.commandBus.execute(
      new PlaceOrderCommand(user.id, dto.symbol, dto.type, dto.quantity, dto.price),
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get user orders' })
  async getOrders(@CurrentUser() user: any) {
    return this.queryBus.execute(new GetOrdersQuery(user.id));
  }
}

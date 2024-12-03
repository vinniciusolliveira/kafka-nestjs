import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrderStatus } from '.prisma/client/orders';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async all() {
    return this.ordersService.all();
  }

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @MessagePattern('payments')
  async complete(@Payload() message) {
    await this.ordersService.complete(message.orderId,
      message.status === 'APPROVED' ? OrderStatus.PAYED : OrderStatus.CANCELED
    );
  }
}

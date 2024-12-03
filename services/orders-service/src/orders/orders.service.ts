import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { Orders } from '../entities/orders.entity';
import { CreateOrderDto } from '../dto/create-order.dto';
import { ClientKafka } from '@nestjs/microservices';
import {  PrismaService } from '../prisma/prisma.service';
import { lastValueFrom } from 'rxjs';
import { OrderStatus } from '.prisma/client/orders';



@Injectable()
export class OrdersService {
    constructor(
        private prismaService: PrismaService,
        @Inject('ORDERS_SERVICE')
        private kafkaClient: ClientKafka,
      ) {}

      async all() {
        return this.prismaService.orders.findMany();
      }
    

      async create(createOrderDto: CreateOrderDto) {
        const order = await this.prismaService.orders.create({
            data: {
            ...createOrderDto,
            status: OrderStatus.PENDING,
          },
        });
        await lastValueFrom(this.kafkaClient.emit('orders', order));
        return order;
      }

      complete(id: number, status: OrderStatus) {
        return this.prismaService.orders.update({
          where: { id },
          data: { status },
        });
      }
}
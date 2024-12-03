import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
//import { TypeOrmModule } from '@nestjs/typeorm';
//import { Orders } from '../entities/orders.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports:[
  //TypeOrmModule.forFeature([Orders])
  PrismaModule,
  ClientsModule.registerAsync([
    {
      name: 'ORDERS_SERVICE',
      useFactory: () => ({
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'orders',
            brokers: ['localhost:9092'],
          }
        }
      })
    }]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}

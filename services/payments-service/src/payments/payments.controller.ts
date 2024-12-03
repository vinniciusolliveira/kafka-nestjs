import { Controller, Get, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  all() {
    return this.paymentsService.all();
  }

  @MessagePattern('orders')
  async payment(@Payload() message) {
    await this.paymentsService.payment({
      amount: message.price,
      orderId: message.id,
      clientId: message.clientId
    })
    
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { PaymentStatus } from '.prisma/client/payments';

@Injectable()
export class PaymentsService {
    constructor(
        private prismaService: PrismaService,
        @Inject('PAYMENTS_SERVICE')
        private kafkaClient: ClientKafka
    ) {}

    all() {
        return this.prismaService.payment.findMany();
    }

    async payment(data: CreatePaymentDto) {
        const payment = await this.prismaService.payment.create({
            data: {
                ...data,
                status: PaymentStatus.APPROVED
            }
        });
        await lastValueFrom(this.kafkaClient.emit('payments', payment));
        return payment;
    }
}

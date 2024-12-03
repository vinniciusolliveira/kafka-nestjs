import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from '../entities/orders.entity';

@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync({useFactory: (ConfigService: ConfigService) => ({
            type: 'postgres',
            host: ConfigService.get('DATABASE_HOST'),
            port: ConfigService.get('DATABASE_PORT'),
            username: ConfigService.get('DATABASE_USER'),
            password: ConfigService.get('DATABASE_PASSWORD'),
            database: ConfigService.get('DATABASE_NAME'),
            autoLoadEntities: true,
            entities: [Orders],
            migrations: ['./migrations/*.ts'],
            synchronize: ConfigService.get('DATABASE_SYNCHRONIZE')
        }),
        inject: [ConfigService]
    })
    ],
})
export class DatabaseModule {}

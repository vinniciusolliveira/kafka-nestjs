import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Orders {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'int' })
    price: number;

    @Column({ type: 'int' })
    clientId: number;

    @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'enum', enum: ['PENDING', 'PAYED', 'CANCELED'] })
    status: string;
}
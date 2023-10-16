import { Role } from '@/utils/constants';
import {
    Column,
    CreatedAt,
    DataType,
    HasMany,
    IsEmail,
    Model,
    Table,
    Unique,
    UpdatedAt,
} from 'sequelize-typescript';
import { Transaction } from './transaction.entity';

@Table({
    tableName: 'users',
    timestamps: true,
})
export class User extends Model {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @Unique
    @IsEmail
    @Column
    email: string;

    @Column
    password: string;

    @Column({ defaultValue: Role.CUSTOMER })
    role: string;

    @Column({ defaultValue: true })
    active: boolean;

    @Column
    fullName: string;

    @Column
    phoneNumber: string;

    @Column
    @CreatedAt
    createdAt: Date;

    @Column
    @UpdatedAt
    updatedAt: Date;

    @HasMany(() => Transaction)
    transactions: Transaction[];
}

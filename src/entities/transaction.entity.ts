import {
    AutoIncrement,
    BelongsTo,
    Column,
    CreatedAt,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt,
} from 'sequelize-typescript';
import { User } from './users.entity';
import { Item } from './item.entity';

@Table({
    tableName: 'transactions',
    timestamps: true,
})
export class Transaction extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;

    @ForeignKey(() => User)
    @Column(DataType.UUID)
    userId: string;

    @Column
    price: number;

    @Column
    address: string;

    @Column
    status: string;

    @Column
    @CreatedAt
    createdAt: Date;

    @Column
    @UpdatedAt
    updatedAt: Date;

    @BelongsTo(() => User)
    user: User;

    @HasMany(() => Item)
    tree: Item;
}

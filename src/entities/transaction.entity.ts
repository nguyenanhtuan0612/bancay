import {
    AutoIncrement,
    BelongsTo,
    BelongsToMany,
    Column,
    CreatedAt,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt,
} from 'sequelize-typescript';
import { Item } from './item.entity';
import { Tree } from './tree.entity';
import { User } from './users.entity';

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

    @BelongsToMany(() => Tree, () => Item)
    tree: Tree;
}

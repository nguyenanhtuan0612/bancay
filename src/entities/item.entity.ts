import {
    BelongsTo,
    Column,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';
import { Tree } from './tree.entity';
import { Transaction } from './transaction.entity';

@Table({
    tableName: 'item',
    timestamps: true,
})
export class Item extends Model {
    @ForeignKey(() => Tree)
    @PrimaryKey
    @Column
    treeId: number;

    @ForeignKey(() => Transaction)
    @PrimaryKey
    @Column
    transactionId!: number;

    @Column
    quantity: number;

    @BelongsTo(() => Tree)
    tree: Tree;

    @BelongsTo(() => Transaction)
    transactions: Transaction;
}

import {
    AutoIncrement,
    Column,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';

@Table({
    tableName: 'transaction_statistics',
    timestamps: true,
})
export class TransactionStatistic extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;

    @Column
    month: number;

    @Column
    year: number;

    @Column
    accountCreate: number;

    @Column
    amount: number;

    @Column
    accountSold: number;
}

import {
    AutoIncrement,
    Column,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';

@Table({
    tableName: 'count_user_register',
    timestamps: true,
})
export class CountUserRegister extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;

    @Column
    month: number;

    @Column
    year: number;

    @Column
    count: number;
}

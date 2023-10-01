import {
    AutoIncrement,
    BelongsToMany,
    Column,
    CreatedAt,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt,
} from 'sequelize-typescript';
import { Category } from './categories.entity';
import { Item } from './item.entity';
import { Transaction } from './transaction.entity';
import { TreeCategoryLinks } from './treeCategoryLink.entity';

@Table({
    tableName: 'tree',
    timestamps: true,
})
export class Tree extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;

    @Column
    name: string;

    @Column
    description: string;

    @Column
    price: number;

    @Column
    image: string;

    @Column({ defaultValue: true })
    active: boolean;

    @Column({ defaultValue: 0 })
    inStock: number;

    @Column
    @CreatedAt
    createdAt: Date;

    @Column
    @UpdatedAt
    updatedAt: Date;

    @BelongsToMany(() => Category, () => TreeCategoryLinks)
    categories: Category[];

    @BelongsToMany(() => Transaction, () => Item)
    transaction: Transaction;
}

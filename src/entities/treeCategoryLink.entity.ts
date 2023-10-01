import {
    BelongsTo,
    Column,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';
import { Category } from './categories.entity';
import { Tree } from './tree.entity';

@Table({
    tableName: 'tree_category_links',
    timestamps: true,
})
export class TreeCategoryLinks extends Model {
    @ForeignKey(() => Tree)
    @PrimaryKey
    @Column
    treeId: number;

    @ForeignKey(() => Category)
    @PrimaryKey
    @Column
    categoryId!: number;

    @BelongsTo(() => Tree)
    tree: Tree;

    @BelongsTo(() => Category)
    category: Category;
}

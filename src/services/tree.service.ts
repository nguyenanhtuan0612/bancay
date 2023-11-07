import { AddTreeDto, UpdateTreeDto } from '@/dtos/tree.dto';
import { Category } from '@/entities/categories.entity';
import { Tree } from '@/entities/tree.entity';
import { TreeCategoryLinks } from '@/entities/treeCategoryLink.entity';
import { User } from '@/entities/users.entity';
import { ExceptionWithMessage } from '@/exceptions/HttpException';
import { Options } from '@/interfaces/request.interface';
import { TIKTOK_ACCOUNT_COIN_CATEGORY } from '@/utils/constants';
import { errors } from '@/utils/errors';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TreeServie {
    async create(dto: AddTreeDto) {
        const data = new Tree();
        data.name = dto.name;
        data.description = dto.description;
        data.active = true;
        data.price = dto.price;
        data.image = dto.image;
        data.inStock = dto.inStock;
        const res = await data.save();
        for (const iterator of dto.categories) {
            const cate = await Category.findByPk(iterator);
            if (cate) {
                const link = new TreeCategoryLinks();
                link.categoryId = cate.id;
                link.treeId = res.id;
                await link.save();
            }
        }

        return res;
    }

    async update(id: number, dto: UpdateTreeDto) {
        let data = await Tree.findByPk(id);
        if (!data) {
            throw new ExceptionWithMessage(errors.ACCOUNT_NOT_FOUND, 404);
        }
        await Tree.update(dto, { where: { id: data.id } });
        if (dto.categories) {
            await TreeCategoryLinks.destroy({
                where: {
                    treeId: data.id,
                },
            });

            for (const iterator of dto.categories) {
                const cate = await Category.findByPk(iterator);
                if (cate) {
                    const link = new TreeCategoryLinks();
                    link.categoryId = cate.id;
                    link.treeId = data.id;
                    await link.save();
                }
            }
        }

        data = await Tree.findByPk(id, {
            include: [{ model: Category }],
        });
        return data;
    }

    async detail(id: number) {
        const data = await Tree.findByPk(id, {
            include: [{ model: Category }],
        });
        if (!data) {
            throw new ExceptionWithMessage(errors.ACCOUNT_NOT_FOUND, 404);
        }

        return data;
    }

    async list(options: Options) {
        const data = await Tree.findAndCountAll({
            ...options,
            include: [{ model: Category }],
        });

        return data;
    }

    async listByCategory(id: number, options: Options) {
        const { where, limit, order, offset } = options;

        const data = await Tree.findAndCountAll({
            where: {
                ...where,
                active: true,
            },
            limit,
            offset,
            order,
            include: [
                {
                    model: Category,
                    required: true,
                    through: {
                        where: { categoryId: id },
                    },
                },
            ],
        });

        return data;
    }

    async delete(id: number) {
        const data = await Tree.findByPk(id);
        if (!data) {
            throw new ExceptionWithMessage(errors.ACCOUNT_NOT_FOUND, 404);
        }
        await data.destroy();

        return data;
    }

    async listTree(options: Options) {
        const { where, limit, order, offset } = options;
        const cate = await Category.findOne({
            where: { name: TIKTOK_ACCOUNT_COIN_CATEGORY },
        });
        if (!cate) {
            return { count: 0, rows: [] };
        }

        const data = await Tree.findAndCountAll({
            where: {
                ...where,
                ownedBy: null,
                active: true,
            },
            limit,
            offset,
            order,
            include: [
                {
                    model: Category,
                    required: true,
                    through: {
                        where: { categoryId: cate.id },
                    },
                },
            ],
        });

        return data;
    }

    async listTreeForAdmin(options: Options) {
        const { where, limit, order, offset } = options;

        const cate = await Category.findOne({
            where: { name: TIKTOK_ACCOUNT_COIN_CATEGORY },
        });
        if (!cate) {
            return { count: 0, rows: [] };
        }

        const data = await Tree.findAndCountAll({
            where,
            limit,
            offset,
            order,
            include: [
                {
                    model: Category,
                    required: true,
                    through: {
                        where: { categoryId: cate.id },
                    },
                },
            ],
        });

        return data;
    }
}

import { CreateCategoryDto, UpdateCategoryDto } from '@/dtos/categories.dto';
import { Category } from '@/entities/categories.entity';
import { User } from '@/entities/users.entity';
import { ExceptionWithMessage } from '@/exceptions/HttpException';
import { Options } from '@/interfaces/request.interface';
import { errors } from '@/utils/errors';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoriesService {
    async create(dto: CreateCategoryDto) {
        const data = new Category();
        data.name = dto.name;
        data.image = dto.image;
        data.active = dto.active ? true : false;
        const res = await data.save();

        return res;
    }

    async update(id: number, dto: UpdateCategoryDto) {
        let data = await Category.findByPk(id);
        if (!data) {
            throw new ExceptionWithMessage(errors.ACCOUNT_NOT_FOUND, 404);
        }
        await Category.update(dto, { where: { id: data.id } });
        data = await Category.findByPk(id);
        return data;
    }

    async detail(id: number) {
        const data = await Category.findByPk(id, {
            include: [{ model: User }],
        });
        if (!data) {
            throw new ExceptionWithMessage(errors.RECORD_NOT_FOUND, 404);
        }

        return data;
    }

    async list(options: Options) {
        const data = await Category.findAndCountAll(options);

        return data;
    }

    async delete(id: number) {
        const data = await Category.findByPk(id, {
            include: [{ model: User }],
        });
        if (!data) {
            throw new ExceptionWithMessage(errors.RECORD_NOT_FOUND, 404);
        }
        await data.destroy();

        return data;
    }
}

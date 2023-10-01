import { UpdateTreeDto } from '@/dtos/tree.dto';
import { ChangeRoleDto, CreateUserDto, UserResponse } from '@/dtos/users.dto';
import { CountUserRegister } from '@/entities/countUserRegister.entity';
import { User } from '@/entities/users.entity';
import { ExceptionWithMessage } from '@/exceptions/HttpException';
import { Options } from '@/interfaces/request.interface';
import { IUser } from '@/interfaces/users.interface';
import { errors } from '@/utils/errors';
import { Injectable } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class UsersService {
    async create(createUserDto: CreateUserDto) {
        const user = new User();
        user.email = createUserDto.email;
        const salt = await genSalt(10);
        user.password = await hash(createUserDto.password, salt);
        user.role = createUserDto.role;
        const userData: IUser = await user.save();

        const month = new Date().getMonth();
        const year = new Date().getFullYear();
        const count = await CountUserRegister.findOne({
            where: { month, year },
        });

        if (count) {
            count.count += 1;
            await count.save();
        } else {
            const data = new CountUserRegister();
            data.month = month;
            data.year = year;
            data.count = 1;
            await data.save();
        }

        return userData;
    }

    async detail(id: string) {
        const userData = await User.findByPk(id);
        if (!userData) {
            throw new ExceptionWithMessage(errors.USER_NOT_FOUND, 404);
        }
        return new UserResponse(userData);
    }

    async banUser(id: string) {
        const userData = await User.findByPk(id);
        if (!userData) {
            throw new ExceptionWithMessage(errors.USER_NOT_FOUND, 404);
        }
        userData.active = false;
        await userData.save();
        return new UserResponse(userData);
    }

    async unBanUser(id: string) {
        const userData = await User.findByPk(id);
        if (!userData) {
            throw new ExceptionWithMessage(errors.USER_NOT_FOUND, 404);
        }
        userData.active = true;
        await userData.save();
        return new UserResponse(userData);
    }

    async update(id: string, dto: UpdateTreeDto) {
        let userData = await User.findByPk(id);
        if (!userData) {
            throw new ExceptionWithMessage(errors.USER_NOT_FOUND, 404);
        }
        await User.update(dto, { where: { id } });

        userData = await User.findByPk(id);
        return new UserResponse(userData);
    }

    async list(options: Options) {
        const { limit, offset, where, order } = options;
        const data = await User.findAndCountAll({
            where,
            limit,
            offset,
            order,
        });

        return data;
    }

    async changeRole(id: string, dto: ChangeRoleDto) {
        const userData = await User.findByPk(id);
        if (!userData) {
            throw new ExceptionWithMessage(errors.USER_NOT_FOUND, 404);
        }
        userData.role = dto.role;
        await userData.save();
        return new UserResponse(userData);
    }
}

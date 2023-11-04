import { Injectable } from '@nestjs/common';
import {
    ChangePasswordDto,
    LoginDto,
    RegisterDto,
    UserResponeWithToken,
    UserResponse,
} from '@/dtos/users.dto';
import { errors } from '@/utils/errors';
import { User } from '@/entities/users.entity';
import { compare, genSalt, hash } from 'bcrypt';
import { ExceptionWithMessage } from '@/exceptions/HttpException';
import { authConfigs } from '@/config';
import { JwtService } from '@nestjs/jwt';
// import { CountUserRegister } from '@/entities/countUserRegister.entity';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    async register(registerDto: RegisterDto) {
        const check = await User.findOne({
            where: { email: registerDto.email },
        });

        if (check)
            throw new ExceptionWithMessage(
                errors.EMAIL_EXIST,
                400,
                'Register Fail',
            ); // error
        const user = new User();
        user.email = registerDto.email;

        const salt = await genSalt(10);
        user.password = await hash(registerDto.password, salt);
        const userData = await user.save();

        const month = new Date().getMonth();
        const year = new Date().getFullYear();
        // const count = await CountUserRegister.findOne({
        //     where: { month, year },
        // });

        // if (count) {
        //     count.count += 1;
        //     await count.save();
        // } else {
        //     const data = new CountUserRegister();
        //     data.month = month;
        //     data.year = year;
        //     data.count = 1;
        //     await data.save();
        // }

        return new UserResponse(userData);
    }

    async login(dto: LoginDto): Promise<UserResponeWithToken> {
        const user = await User.findOne({
            where: { email: dto.email, active: true },
        });
        if (user) {
            const compareResult = await compare(dto.password, user.password);
            if (compareResult) {
                const payload = {
                    email: user.email,
                    sub: user.id,
                };

                const tokenExpiresIn = authConfigs().jwtExpiresIn;
                const accessToken = await this.jwtService.signAsync(payload, {
                    expiresIn: tokenExpiresIn,
                });
                const refreshTokenExpiresIn = authConfigs().jwtRefreshExpiresIn;
                const refreshToken = await this.jwtService.signAsync(payload, {
                    secret: authConfigs().jwtRefreshTokenKey,
                    expiresIn: refreshTokenExpiresIn,
                });

                return new UserResponeWithToken(user, {
                    accessToken,
                    refreshToken,
                    tokenExpiresIn,
                    refreshTokenExpiresIn,
                });
            }
            throw new ExceptionWithMessage(
                errors.USERNAME_PASSWORD_INVALID,
                401,
                'Login Fail',
            );
        }
        throw new ExceptionWithMessage(
            errors.USERNAME_PASSWORD_INVALID,
            401,
            'Login Fail',
        );
    }

    async changePassword(
        userId: string,
        dto: ChangePasswordDto,
    ): Promise<UserResponse> {
        const user = await User.findOne({
            where: { id: userId },
        });
        if (user) {
            const compareResult = await compare(
                dto.currentPassword,
                user.password,
            );
            if (compareResult) {
                const salt = await genSalt(10);
                user.password = await hash(dto.newPassword, salt);

                return new UserResponse(user);
            }
            throw new ExceptionWithMessage(
                errors.CURRENT_PASSWORD_NOT_MATCH,
                401,
            );
        }
        throw new ExceptionWithMessage(errors.USER_NOT_FOUND, 404);
    }
}

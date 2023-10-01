import { authConfigs } from '@/config';
import { UserResponse } from '@/dtos/users.dto';
import { User } from '@/entities/users.entity';
import { ExceptionWithMessage } from '@/exceptions/HttpException';
import { errors } from '@/utils/errors';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: authConfigs().jwtSecretKey,
        });
        //console.log(authConfigs().jwtSecretKey);
    }

    async validate(payload: any) {
        const user = await User.findByPk(payload.sub);
        if (!user) {
            throw new ExceptionWithMessage(
                errors.LOGIN_ERROR_UNAUTHORIZE,
                401,
                'Wrong authentication token',
            );
        }

        const data = new UserResponse(user);

        return JSON.parse(JSON.stringify(data));
    }
}

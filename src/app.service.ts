import { Injectable, OnModuleInit } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import { CountUserRegister } from './entities/countUserRegister.entity';
import { User } from './entities/users.entity';
import { Role } from './utils/constants';

@Injectable()
export class AppService implements OnModuleInit {
    async onModuleInit() {
        try {
            const data = await User.findOne({
                where: { email: 'admin@gmail.com' },
            });
            if (!data) {
                const user = new User();
                user.email = 'admin@gmail.com';

                const salt = await genSalt(10);
                user.password = await hash('123456', salt);
                user.role = Role.ADMIN;
                user.active = true;
                await user.save();
            }

            return;
        } catch (error) {
            console.log(error);
        }
    }

    getHello(): string {
        return 'Hello World!';
    }
}

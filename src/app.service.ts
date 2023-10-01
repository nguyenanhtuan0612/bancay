import { Injectable, OnModuleInit } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import { CountUserRegister } from './entities/countUserRegister.entity';
import { TransactionStatistic } from './entities/transactionStatistics.entity';
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

    async dataDashboard() {
        const month = new Date().getMonth();
        const year = new Date().getFullYear();

        const lastMonth = month === 0 ? 11 : month - 1;
        const lastMonthYear = month === 0 ? year - 1 : year;

        const res = {
            totalAccSellLastMonth: 0,
            totalAmountSellLastMonth: 0,

            numUserCreatedThisMonth: 0,
            numAccCreateThisMonth: 0,
            numAccSoldThisMonth: 0,
            amountThisMonth: 0,
        };

        const dataLastMonth = await TransactionStatistic.findOne({
            where: { year: lastMonthYear, month: lastMonth },
        });
        if (dataLastMonth) {
            res.totalAccSellLastMonth = dataLastMonth.accountSold || 0;
            res.totalAmountSellLastMonth = dataLastMonth.amount || 0;
        }

        const userCreatedThisMonth = await CountUserRegister.findOne({
            where: { year, month },
        });
        if (userCreatedThisMonth) {
            res.numUserCreatedThisMonth = userCreatedThisMonth.count || 0;
        }

        const thisMonth = await TransactionStatistic.findOne({
            where: { year, month },
        });
        if (thisMonth) {
            res.numAccSoldThisMonth = thisMonth.accountSold || 0;
            res.numAccCreateThisMonth = thisMonth.accountCreate || 0;
            res.amountThisMonth = thisMonth.amount || 0;
        }

        return res;
    }
}

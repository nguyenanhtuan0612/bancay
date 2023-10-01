import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { appConfigs, authConfigs } from '@/config';
import { PostgreSqlModule } from '@databases';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { CategoriesController } from './controllers/categories.controller';
import { TiktokController } from './controllers/tree.controller';
import { TransactionController } from './controllers/transaction.controller';
import UsersController from './controllers/users.controller';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { QueryMiddleware } from './middlewares/query.middleware';
import { AuthService } from './services/auth.service';
import { CategoriesService } from './services/category.service';
import { TreeServie } from './services/tree.service';
import { TransactionService } from './services/transaction.service';
import { UsersService } from './services/users.service';
import { JwtStrategy } from './strategies/jwt.strategy';
const ENV = process.env.NODE_ENV;
console.log(ENV);

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [appConfigs, authConfigs],
            envFilePath: !ENV ? '.env' : `.env.${ENV}`,
        }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async () => ({
                secret: authConfigs().jwtSecretKey,
            }),
            inject: [ConfigService],
        }),
        PostgreSqlModule,
    ],
    controllers: [
        AppController,
        UsersController,
        AuthController,
        TiktokController,
        CategoriesController,
        TransactionController,
    ],
    providers: [
        JwtStrategy,
        AppService,
        UsersService,
        AuthService,
        TreeServie,
        CategoriesService,
        TransactionService,
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes('*');
        consumer
            .apply(QueryMiddleware)
            .forRoutes({ path: '*', method: RequestMethod.GET });
    }
    constructor() {
        //console.log(appConfigs());
    }
}

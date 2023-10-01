import { appConfigs } from '@/config';
import entities from '@/entities';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
    imports: [
        SequelizeModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async () => ({
                dialect: 'postgres',
                host: appConfigs().postgres.host,
                port: appConfigs().postgres.port,
                username: appConfigs().postgres.username,
                password: appConfigs().postgres.password,
                database: appConfigs().postgres.database,
                autoLoadModels: appConfigs().postgres.autoLoadModels,
                synchronize: appConfigs().postgres.synchronize,
                logging: false,
                dialectOptions: {
                    timeout: 8000,
                },
                models: entities,
                hooks: {
                    beforeCount: function (options: any) {
                        if (!this._scope.include) {
                            options.subQuery = false;
                        }
                        if (
                            this._scope.include &&
                            this._scope.include.length > 0
                        ) {
                            options.distinct = true;
                            options.col =
                                this._scope.col ||
                                options.col ||
                                `"${this.options.name.singular}".id`;
                        }
                        if (options.include && options.include.length > 0) {
                            options.include = null;
                        }
                    },
                },
            }),
            inject: [ConfigService],
        }),
    ],
})
export class PostgreSqlModule {}

import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appConfigs } from './config';
import { AllExceptionFilter } from './exceptions/exception';
import { setupSwagger } from './swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.get(ConfigService);
    app.setGlobalPrefix('api');
    setupSwagger(app);
    app.useGlobalPipes(new ValidationPipe({}));
    app.useGlobalFilters(new AllExceptionFilter());
    await app.listen(appConfigs().port || 80);
}
bootstrap();

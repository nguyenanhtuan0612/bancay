import { INestApplication } from '@nestjs/common';
import {
    SwaggerModule,
    DocumentBuilder,
    SwaggerCustomOptions,
} from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
    const options = new DocumentBuilder()
        .setTitle('Nest.js example API')
        .setDescription(
            'TokenAdmin: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInN1YiI6ImY0NjVhNTEzLTNiYjYtNDJjMy05YzQ2LTNjMjYzODdkOGUwMSIsImlhdCI6MTY5NjQzNTE3NywiZXhwIjoxNzI3OTcxMTc3fQ.qYv4d5S6WUcD8RWppnNOl0xnk85CYbZFQpHCFWRwvfM',
        )
        .setVersion('2.0')
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                in: 'header',
            },
            'authorization',
        )
        .build();

    const customOptions: SwaggerCustomOptions = {
        swaggerOptions: {
            docExpansion: 'none',
        },
    };
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-docs', app, document, customOptions);
}

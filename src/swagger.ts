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
            'TokenAdmin: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInN1YiI6IjAyNDBiZDJmLTM4OWYtNGQ1ZC1iMDA3LTI1MDRjM2MxMGQ1ZCIsImlhdCI6MTY5NjE2NjgwMSwiZXhwIjoxNzI3NzAyODAxfQ.bJsGoowCip_1rKLNaGF406DohZ5uyV96jKodvO5mDUA',
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

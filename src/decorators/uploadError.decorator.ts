import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UploadError = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
        const { uploadError } = context.switchToHttp().getRequest();
        return uploadError;
    },
);

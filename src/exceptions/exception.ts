import { errors } from '@/utils/errors';
import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { BaseError } from 'sequelize';
import { ExceptionWithMessage } from './HttpException';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionFilter.name);
    constructor() {}
    catch(exception: HttpException | Error, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        // Handling error message and logging
        this.handleLogger(exception);

        // Response to client
        AllExceptionFilter.handleResponse(exception, ctx);
    }

    private static handleResponse(
        error: HttpException | ExceptionWithMessage | BaseError | Error | any,
        ctx: any,
    ): void {
        let message: any = 'Something went wrong';
        let status = 400;
        let detail: any = {};
        let code = 999;

        const response = ctx.getResponse();

        switch (true) {
            case error instanceof HttpException:
                const exception: HttpException = error;
                const errRes = exception.getResponse();
                detail = errRes;
                if (errRes['message']) {
                    detail = errRes['message'];
                }
                status = exception.getStatus();
                message = '';

                if (exception instanceof ExceptionWithMessage) {
                    const exceptionMsg: ExceptionWithMessage = error;
                    message = exceptionMsg.message;
                    code = exceptionMsg.code;
                }
                break;
            case error instanceof BaseError:
                const baseErr: BaseError = error;
                code = errors.SEQUELIZE_ERROR.code;
                message = baseErr.message;
                detail = error.errors || '';
                status = HttpStatus.BAD_REQUEST;

                break;
            case error instanceof Error:
                const err: Error = error;
                if (err.name == 'ENOENT') {
                    status = HttpStatus.NOT_FOUND;
                }
                message = err.message;
                break;
        }
        response.status(status).json({ code, message, detail });
    }

    private handleLogger(
        exception: HttpException | BaseError | Error | any,
    ): void {
        let message = 'Internal Server Error';
        switch (true) {
            case exception instanceof HttpException:
                message = JSON.stringify(exception.getResponse());
                break;
            case exception instanceof BaseError:
                message = JSON.stringify(exception.errors);
                break;
            case exception instanceof Error:
                message = exception.message;
                break;
            case typeof exception == 'number':
                message = `ErrorCode: ${exception}`;
                break;
        }
        this.logger.error(message);
    }
}

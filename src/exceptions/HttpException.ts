import { HttpException } from '@nestjs/common';

export class ExceptionWithMessage extends HttpException {
    public message: string;
    public code: number;
    public detail: string;

    constructor(
        error: { detail: string; code: number; message?: string },
        status: number,
        message?: string,
    ) {
        super(error.detail, status);
        this.detail = error.detail || null;
        this.code = error.code || 999;
        this.message = message || error.message || `Something wen't wrong`;
    }
}

import { JwtAuthGuard } from '@/guards/jwt.guard';
import { RequestWithUserOption } from '@/interfaces/auth.interface';
import { AuthService } from '@/services/auth.service';
import { ChangePasswordDto, LoginDto, RegisterDto } from '@dtos/users.dto';
import {
    Body,
    Controller,
    Get,
    Post,
    Put,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Authoriztion')
@Controller('auth')
export class AuthController {
    constructor(private readonly service: AuthService) {}

    @ApiBearerAuth('authorization')
    @UseGuards(JwtAuthGuard)
    @Get()
    async profile(@Res() res: Response, @Req() req: RequestWithUserOption) {
        try {
            return res.status(200).json(req.auth);
        } catch (error) {
            throw error;
        }
    }

    @Post('/register')
    async create(@Res() res: Response, @Body() registerDto: RegisterDto) {
        try {
            const rs = await this.service.register(registerDto);
            return res.status(200).json(rs);
        } catch (error) {
            throw error;
        }
    }

    @Post('/login')
    async login(@Res() res: Response, @Body() dto: LoginDto) {
        try {
            const rs = await this.service.login(dto);
            return res.status(200).json(rs);
        } catch (error) {
            throw error;
        }
    }

    @ApiBearerAuth('authorization')
    @UseGuards(JwtAuthGuard)
    @Put('/changePassword')
    async changePassword(
        @Res() res: Response,
        @Req() req: RequestWithUserOption,
        @Body() dto: ChangePasswordDto,
    ) {
        try {
            const rs = await this.service.changePassword(req.auth.id, dto);
            return res.status(200).json(rs);
        } catch (error) {
            throw error;
        }
    }
}

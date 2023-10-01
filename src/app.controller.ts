import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AppService } from './app.service';
import { Roles } from './decorators/roles.decorator';
import { JwtAuthGuard } from './guards/jwt.guard';
import { RolesGuard } from './guards/role.guard';
import { Role } from './utils/constants';

@ApiTags('App')
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @ApiBearerAuth('authorization')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles([Role.ADMIN])
    @Get('dataDashboard')
    async dataDashboard(@Res() res: Response) {
        try {
            const data = await this.appService.dataDashboard();
            return res.status(200).json(data);
        } catch (error) {
            throw error;
        }
    }
}

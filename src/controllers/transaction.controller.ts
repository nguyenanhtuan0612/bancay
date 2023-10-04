import { Roles } from '@/decorators/roles.decorator';
import { AddToCartDto } from '@/dtos/transaction.dto';
import { JwtAuthGuard } from '@/guards/jwt.guard';
import { RolesGuard } from '@/guards/role.guard';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { RequestWithOptions } from '@/interfaces/request.interface';
import { TransactionService } from '@/services/transaction.service';
import { Role } from '@/utils/constants';
import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Transaction')
@Controller('transactions')
export class TransactionController {
    constructor(private readonly service: TransactionService) {}

    @ApiBearerAuth('authorization')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles([Role.CUSTOMER, Role.ADMIN])
    @Post('addToCard')
    async create(
        @Res() res: Response,
        @Req() req: RequestWithUser,
        @Body() body: AddToCartDto,
    ) {
        try {
            const { auth } = req;
            const data = await this.service.addToCart(auth, body.treeId);
            return res.status(200).json(data);
        } catch (error) {
            throw error;
        }
    }

    @ApiBearerAuth('authorization')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles([Role.CUSTOMER, Role.ADMIN])
    @Put('removeFromCart')
    async remove(
        @Res() res: Response,
        @Req() req: RequestWithUser,
        @Body() body: AddToCartDto,
    ) {
        try {
            const { auth } = req;
            const data = await this.service.removeFromCart(auth, body.treeId);
            return res.status(200).json(data);
        } catch (error) {
            throw error;
        }
    }

    @ApiBearerAuth('authorization')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles([Role.CUSTOMER])
    @Put('myCart')
    async myCart(@Res() res: Response, @Req() req: RequestWithUser) {
        try {
            const { auth } = req;
            const data = await this.service.myCart(auth);
            return res.status(200).json(data);
        } catch (error) {
            throw error;
        }
    }

    @ApiBearerAuth('authorization')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles([Role.ADMIN])
    @Put('comfirmDelivering/:id')
    async comfirmDelivering(
        @Res() res: Response,
        @Req() req: RequestWithUser,
        @Param('id') id: number,
    ) {
        try {
            const data = await this.service.comfirmDelivering(id);
            return res.status(200).json(data);
        } catch (error) {
            throw error;
        }
    }

    @ApiBearerAuth('authorization')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles([Role.ADMIN])
    @Put('comfirmDone/:id')
    async comfirmDone(
        @Res() res: Response,
        @Req() req: RequestWithUser,
        @Param('id') id: number,
    ) {
        try {
            const data = await this.service.comfirmDone(id);
            return res.status(200).json(data);
        } catch (error) {
            throw error;
        }
    }

    @ApiBearerAuth('authorization')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles([Role.ADMIN])
    @Get()
    async list(@Res() res: Response, @Req() req: RequestWithOptions) {
        try {
            const { options } = req;
            const data = await this.service.list(options);
            return res.status(200).json(data);
        } catch (error) {
            throw error;
        }
    }

    @ApiBearerAuth('authorization')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles([Role.ADMIN])
    @Put(':id')
    async comfirmDdetailone(@Res() res: Response, @Param('id') id: number) {
        try {
            const data = await this.service.detail(id);
            return res.status(200).json(data);
        } catch (error) {
            throw error;
        }
    }
}

import { RequestWithUserOption } from '@/interfaces/auth.interface';
import { UsersService } from '@/services/users.service';
import { ChangeRoleDto, CreateUserDto } from '@dtos/users.dto';
import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Req,
    Res,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Users')
@Controller('users')
class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto, @Res() res: any) {
        try {
            const rs = await this.usersService.create(createUserDto);
            return res.status(200).json(rs);
        } catch (error) {
            throw error;
        }
    }

    @ApiQuery({
        name: 'filter',
        description:
            '[{"operator":"search","value":"provai","prop":"email,fullName"},{"operator":"eq","value":"887c1870-3000-4110-9426-89afa8724d69","prop":"id"}]',
        required: false,
    })
    @ApiQuery({
        name: 'sort',
        description: '[{"direction":"DESC","prop":"createdAt"}]',
        required: false,
    })
    @ApiQuery({
        name: 'offset',
        description: '0',
        required: false,
    })
    @ApiQuery({
        name: 'limit',
        description: '10',
        required: false,
    })
    @Get()
    async list(@Req() req: RequestWithUserOption, @Res() res: any) {
        try {
            const rs = await this.usersService.list(req.options);
            return res.status(200).json(rs);
        } catch (error) {
            throw error;
        }
    }

    @Put('ban/:id')
    async ban(@Param('id') id: string, @Res() res: any) {
        try {
            const rs = await this.usersService.banUser(id);
            return res.status(200).json(rs);
        } catch (error) {
            throw error;
        }
    }

    @Put('unBan/:id')
    async unBan(@Param('id') id: string, @Res() res: any) {
        try {
            const rs = await this.usersService.unBanUser(id);
            return res.status(200).json(rs);
        } catch (error) {
            throw error;
        }
    }

    @Put('changeRole/:id')
    async changeRole(
        @Param('id') id: string,
        @Res() res: Response,
        @Body() dto: ChangeRoleDto,
    ) {
        try {
            const rs = await this.usersService.changeRole(id, dto);
            return res.status(200).json(rs);
        } catch (error) {
            throw error;
        }
    }

    @Get('detail/:id')
    async detail(
        @Param('id') id: string,
        @Res() res: any,
        @Req() req: RequestWithUserOption,
    ) {
        try {
            // if (req.auth.role !== Role.ADMIN || req.auth.id !== id) {
            //     throw new ExceptionWithMessage(errors.FORBIDDEN_RESOURCE, 403);
            // }
            const rs = await this.usersService.detail(id);
            return res.status(200).json(rs);
        } catch (error) {
            throw error;
        }
    }
}

export default UsersController;

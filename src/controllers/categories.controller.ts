import { Roles } from '@/decorators/roles.decorator';
import { CreateCategoryDto, UpdateCategoryDto } from '@/dtos/categories.dto';
import { JwtAuthGuard } from '@/guards/jwt.guard';
import { RolesGuard } from '@/guards/role.guard';
import { RequestWithUserOption } from '@/interfaces/auth.interface';
import { CategoriesService } from '@/services/category.service';
import { Role } from '@/utils/constants';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
    constructor(private readonly service: CategoriesService) {}

    @ApiBearerAuth('authorization')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles([Role.ADMIN])
    @Post()
    async create(@Res() res: Response, @Body() dto: CreateCategoryDto) {
        try {
            const data = await this.service.create(dto);
            return res.status(200).json(data);
        } catch (error) {
            throw error;
        }
    }

    @ApiBearerAuth('authorization')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles([Role.ADMIN])
    @Put('/update/:id')
    async update(
        @Res() res: Response,
        @Param('id') id: number,
        @Body() dto: UpdateCategoryDto,
    ) {
        try {
            const data = await this.service.update(id, dto);
            return res.status(200).json(data);
        } catch (error) {
            throw error;
        }
    }

    @Get('/detail/:id')
    async detail(@Res() res: Response, @Param('id') id: number) {
        try {
            const data = await this.service.detail(id);
            return res.status(200).json(data);
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
    async list(@Res() res: Response, @Req() req: RequestWithUserOption) {
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
    @Delete('/delete/:id')
    async delete(@Res() res: Response, @Param('id') id: number) {
        try {
            const data = await this.service.delete(id);
            return res.status(200).json(data);
        } catch (error) {
            throw error;
        }
    }
}

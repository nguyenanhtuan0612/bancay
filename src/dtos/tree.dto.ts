import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsArray,
    IsBoolean,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

export class AddTreeDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    description: string;

    @ApiProperty()
    @IsNumber()
    price: number;

    @ApiProperty()
    @IsNumber()
    inStock: number;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    image: string;

    @ApiPropertyOptional()
    @IsArray()
    @IsOptional()
    categories: number[];

    @ApiPropertyOptional()
    @IsBoolean()
    @IsOptional()
    active: boolean;
}

export class UpdateTreeDto {
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    name: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    description: string;

    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional()
    inStock: number;

    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional()
    price: number;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    image: string;

    @ApiPropertyOptional()
    @IsArray()
    @IsOptional()
    categories: number[];

    @ApiPropertyOptional()
    @IsBoolean()
    @IsOptional()
    active: boolean;
}

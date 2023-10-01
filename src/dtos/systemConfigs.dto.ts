import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateConfigDto {
    @ApiProperty()
    @IsOptional()
    @IsNumber()
    exchangeRate: number;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    discountForColaborator: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    secureToken: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    bankName: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    accountNumber: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    accountName: string;
}

export class ImportTreeCoinDto {
    @ApiProperty({ type: 'string', format: 'binary' })
    file: any;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

class Item {
    @ApiProperty()
    @IsNumber()
    treeId: number;

    @ApiProperty()
    @IsNumber()
    quantity: number;
}

export class AddToCartDto {
    @ApiProperty()
    @IsNumber()
    treeId: number;
}

export class PurchaseDto {
    address: string;
}

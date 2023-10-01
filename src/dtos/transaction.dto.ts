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

export class BuyTreeDto {
    @ApiProperty()
    items: Item[];

    @ApiProperty()
    @IsString()
    address: string;
}

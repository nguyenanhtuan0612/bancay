import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
    constructor() {}

    // @Get()
    // getHello(): string {
    //     return this.appService.getHello();
    // }
}

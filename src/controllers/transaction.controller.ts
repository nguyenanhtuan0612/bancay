import { TransactionService } from '@/services/transaction.service';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Transaction')
@Controller('transactions')
export class TransactionController {
    constructor(private readonly service: TransactionService) {}
}

import { PaymentDto } from './../../data/Dtos/payment.dto';
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PaystackService } from '../../services/paystack/paystack.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(private paystackService: PaystackService) {}

  @Post('initialize')
  async initialize(@Body() model: PaymentDto) {
    const response = await this.paystackService.initializeTransaction(model);
    return response;
  }

  @Get('verify/:reference')
  async verify(@Param('reference') reference: string) {
    const response = await this.paystackService.verifyTransaction(reference);
    return response;
  }
}

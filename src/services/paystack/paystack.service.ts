import { PaymentDto } from './../../data/Dtos/payment.dto';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PaystackService {
  private headers = {
    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    'Content-Type': 'application/json',
  };

  async initializeTransaction(model: PaymentDto) {
    const url = `${process.env.PAYSTACK_API_URL}/transaction/initialize`;
    const response = await axios.post(url, model, { headers: this.headers });
    return response.data;
  }

  async verifyTransaction(reference: string) {
    const url = `${process.env.PAYSTACK_API_URL}/transaction/verify/${reference}`;

    const response = await axios.get(url, { headers: this.headers });
    return response.data;
  }
}

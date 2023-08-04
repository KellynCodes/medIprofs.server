import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PaymentDto {
  @ApiProperty({
    description: 'sender email',
    example: 'user@gmail.com',
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'amount to send',
    example: 5000,
  })
  @IsNotEmpty()
  amount: number;
}

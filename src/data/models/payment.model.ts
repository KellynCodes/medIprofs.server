import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Schema } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Payment {
  @Prop()
  email: string;

  @Prop()
  amount: number;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);

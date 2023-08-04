import { PaystackService } from './../../services/paystack/paystack.service';
import { PaymentSchema } from './../../data/models/payment.model';
import { ContactSchema } from './../../data/models/contact.model';
import { HttpExceptionFilter } from './../../middlewares/exception/exception.middleware';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './../../services/app/app.service';
import { PaymentController } from '../payment/payment.controller';
import { ContactController } from '../contact/contact.controller';
import { APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ContactService } from '../../services/contact/contact.service';

@Module({
  controllers: [AppController, PaymentController, ContactController],
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_REMOTE_URI),
    MongooseModule.forFeature([{ name: 'Contact', schema: ContactSchema }]),
    MongooseModule.forFeature([{ name: 'Payment', schema: PaymentSchema }]),
  ],
  providers: [
    AppService,
    ContactService,
    PaystackService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}

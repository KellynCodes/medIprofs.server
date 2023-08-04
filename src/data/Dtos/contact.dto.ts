import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ContactDto {
  @ApiProperty({
    description: 'users name',
    example: 'kelly',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'email of the user making a contact.',
    example: 'user@gmail.com',
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Subject of the message',
    example: 'Malaria test.',
  })
  @IsNotEmpty()
  subject?: string;

  @ApiProperty({
    description: 'The message body.',
    example:
      'I like to run a malaria test with one of your professional doctors.',
  })
  @IsNotEmpty()
  message: string;
}

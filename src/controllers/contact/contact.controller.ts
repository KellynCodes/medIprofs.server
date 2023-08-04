import { RequestQuery } from './../../data/Dtos/request.query.dto';
import { HttpResponse } from './../../data/Dtos/http.response.dto';
import { ContactDto } from 'src/data/Dtos/contact.dto';
import { ContactService } from './../../services/contact/contact.service';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Post('')
  async contactAsync(
    @Body() model: ContactDto,
  ): Promise<HttpResponse<ContactDto>> {
    return await this.contactService.contactAsync(model);
  }

  @ApiQuery({
    name: 'keyword',
    example: 'true',
    description: 'fetch contacts by recent data: enter true or false',
  })
  @ApiQuery({
    name: 'page',
    example: '1',
    description: 'how many page to return',
  })
  @Get('get-all')
  async getAll(
    @Query() query: RequestQuery,
  ): Promise<HttpResponse<ContactDto[]>> {
    return await this.contactService.findAllContactsAsync(query);
  }
}

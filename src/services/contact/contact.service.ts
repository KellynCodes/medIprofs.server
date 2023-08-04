import { RequestQuery } from './../../data/Dtos/request.query.dto';
import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpResponse } from '../../data/Dtos/http.response.dto';
import { Contact } from 'src/data/models/contact.model';
import { ContactDto } from '../../data/Dtos/contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact.name) private contactModel: Model<Contact>,
  ) {}

  async contactAsync(model: ContactDto): Promise<HttpResponse<ContactDto>> {
    if (model == null) {
      throw new BadRequestException('payload cannot be empty');
    }

    const contact = await this.contactModel.create(model);
    const response: HttpResponse<ContactDto> = {
      message: `${model.name} we have received you message, we will get back to you immediately.`,
      statusCode: HttpStatus.OK,
      data: contact,
    };
    return response;
  }

  async findAllContactsAsync(
    query: RequestQuery,
  ): Promise<HttpResponse<ContactDto[]>> {
    let date: number;
    if (query.keyword == null || query.keyword == 'false') {
      date = null;
    } else if (query.keyword == 'true') {
      date = new Date().getMonth();
    }
    const page: number =
      query.page == null ? (query.page = 1) : Number(query.page);
    const resPerPage: number = 2;
    const skip: number = resPerPage * (page - 1);

    let contact: any;
    if (date != null) {
      contact = await this.contactModel
        .find({ createdAt: { $gte: date } })
        .limit(10)
        .skip(skip)
        .exec();
    } else {
      contact = await this.contactModel.find().limit(10).skip(skip).exec();
    }
    if (contact.length <= 0) {
      const response: HttpResponse = {
        message: 'No contact found.',
        statusCode: HttpStatus.BAD_REQUEST,
      };
      return response;
    }
    const response: HttpResponse<ContactDto[]> = {
      statusCode: HttpStatus.OK,
      message: 'these are list of available messages',
      data: contact,
    };
    return response;
  }
}

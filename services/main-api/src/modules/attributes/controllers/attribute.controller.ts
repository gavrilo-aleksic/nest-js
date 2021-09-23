import { Controller, Get, Request } from '@nestjs/common';
import { IRequest } from 'src/@types/api';

@Controller('attribute')
export class AttributeController {
  @Get()
  async getAll(@Request() request: IRequest) {}
}

import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IRequest } from 'src/@types/api';
import { Routes } from 'src/routes';
import { OrganizationGuard } from 'src/shared/guards/organization.guard';
import { CreateAttributeDTO } from '../models/attribute.dto';
import { AttributeService } from '../services/attribute.service';

@UseGuards(AuthGuard('jwt'), OrganizationGuard)
@Controller(Routes.attribute.root)
export class AttributeController {
  constructor(private attributeService: AttributeService) {}

  @Get()
  async getAll(
    @Request() request: IRequest,
    @Query('organizationId', ParseIntPipe) organizationId: number,
  ) {
    return this.attributeService.getAll(
      organizationId || request.user.selectedOrganizationId,
    );
  }

  @Post()
  async createAttribute(
    @Request() request: IRequest,
    @Body() attribute: CreateAttributeDTO,
    @Query('organizationId') organizationId: number,
  ) {
    return this.attributeService.create(
      request.user,
      organizationId,
      attribute,
    );
  }
}

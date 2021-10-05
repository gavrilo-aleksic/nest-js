import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IRequest } from 'src/@types/api';
import { Routes } from 'src/routes';
import { OrganizationPostDTO } from '../models/organization.dto';
import { OrganizationModel } from '../models/organization.model';
import { OrganizationService } from '../services/organization.service';

@Controller({ path: Routes.organization.root })
export class OrganizationController {
  constructor(private organizationService: OrganizationService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createOrganization(
    @Body() organization: OrganizationPostDTO,
    @Request() request: IRequest,
  ): Promise<OrganizationModel> {
    return this.organizationService.create(organization, request.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async updateOrganization(
    @Body() organization: OrganizationPostDTO,
    @Param('id', ParseIntPipe) id: number,
    @Request() request: IRequest,
  ) {
    return this.organizationService.update(id, request.user.sub, organization);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getOrganization(
    @Param('id', ParseIntPipe) id: number,
    @Request() request: IRequest,
  ) {
    return this.organizationService.getOne(id, request.user.sub);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getOrganizations(@Request() request: IRequest) {
    return this.organizationService.getAll(
      request.user.sub,
      request.pagination,
    );
  }
}

import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IRequest } from 'src/@types/api';
import { transformNumber } from 'src/shared/utils/transform.utils';
import { OrganizationPostDTO } from '../models/organization.dto';
import { OrganizationModel } from '../models/organization.model';
import { OrganizationService } from '../services/organization.service';

@Controller({ path: 'organization' })
export class OrganizationController {
  constructor(private organizationService: OrganizationService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createOrganization(
    @Body() organization: OrganizationPostDTO,
  ): Promise<OrganizationModel> {
    return this.organizationService.create(organization);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async updateOrganization(
    @Body() organization: OrganizationPostDTO,
    @Param('id', { transform: transformNumber }) id: number,
    @Request() request: IRequest,
  ) {
    if (!id) {
      throw new NotFoundException();
    }
    return this.organizationService.update(
      id,
      request.user.userId,
      organization,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getOrganization(
    @Param('id', { transform: transformNumber }) id: number,
    @Request() request: IRequest,
  ) {
    if (!id) {
      throw new NotFoundException();
    }
    return this.organizationService.getOne(id, request.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getOrganizations(@Request() request: IRequest) {
    return this.organizationService.getAll(request.user);
  }
}

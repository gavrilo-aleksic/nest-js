import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJWT } from 'src/@types/api';
import { UserRepository } from 'src/modules/auth/repositories/user.repository';
import {
  defaultOrganizationName,
  OrganizationModel,
} from 'src/modules/organization/models/organization.model';
import { OrganizationRepository } from 'src/modules/organization/repositories/organization.repository';
import { Exceptions } from 'src/shared/errors/error-exceptions';
import { hashPassword, validatePassword } from 'src/shared/utils/auth.utils';
import { UserOrganizationModel } from '../models/user-organization.model';
import { UpdateUserDTO, CreateUserDTO } from '../models/user.dto';
import { UserModel } from '../models/user.model';
import { UserOrganizationRepository } from '../repositories/user-organization.repository';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private organizationRepository: OrganizationRepository,
    private jwtService: JwtService,
    private userOrganizationRepository: UserOrganizationRepository,
  ) {}

  async getUser(id: number) {
    const existingUser = await this.userRepository.getOne(id);
    if (!existingUser) {
      throw Exceptions.auth.NotFoundException(id);
    }
    return existingUser;
  }

  async createUser(user: CreateUserDTO) {
    const existingUser = await this.userRepository.findByUsername(
      user.username,
    );
    if (existingUser) {
      throw Exceptions.auth.NameTakenException(user.username);
    }

    const encPassword = hashPassword(user.password);
    const newUser = new UserModel(user.username, encPassword);

    const createdUser = await this.userRepository.save(newUser);

    if (user.isAdmin && !user.organizationIds) {
      const newOrganization = new OrganizationModel(defaultOrganizationName());
      const organizationResult = await this.organizationRepository.save(
        newOrganization,
      );
      newUser.organizations = [organizationResult];
      newUser.selectedOrganization = newOrganization;
      const relation = UserOrganizationModel.createUserOrganization(
        newUser.id,
        newOrganization.id,
        true,
      );
      await this.userOrganizationRepository.save(relation);
    } else if (user.organizationIds) {
      // TODO: Implement attaching existing organizations to new user;
    }
    return createdUser;
  }

  async validateUser(
    username: string,
    pass: string,
  ): Promise<Partial<UserModel>> {
    const user = await this.userRepository.findByUsername(username);
    if (user && validatePassword(pass, user.encPassword)) {
      return user;
    }
    return null;
  }

  async createAccessToken(user: UserModel) {
    const payload: IJWT = {
      username: user.username,
      sub: user.id,
      selectedOrganizationId: user.selectedOrganization?.id,
      roles: user.getRoles(user.selectedOrganization?.id),
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async updateUser(user: UpdateUserDTO, currentUser: IJWT) {
    const userId = user.userId || currentUser.sub;
    const existingUser = await this.userRepository.getOne(userId);

    if (!existingUser) {
      throw Exceptions.auth.NotFoundException(userId);
    }

    if (user.password) {
      existingUser.encPassword = hashPassword(user.password);
    }

    if (user.selectedOrganizationId) {
      const existingOrganization = await this.organizationRepository.getOne(
        user.selectedOrganizationId,
        userId,
      );
      if (!existingOrganization) {
        throw Exceptions.organization.NotFoundException(
          user.selectedOrganizationId,
        );
      }
      existingUser.selectedOrganization = existingOrganization;
    }
    await this.userRepository.save(existingUser);
    return existingUser;
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJWT } from 'src/@types/api';
import { UserRepository } from 'src/modules/auth/repositories/user.repository';
import { OrganizationRepository } from 'src/modules/organization/repositories/organization.repository';
import { Exceptions } from 'src/shared/errors/error-exceptions';
import { hashPassword, validatePassword } from 'src/shared/utils/auth.utils';
import { UpdateUserDTO, UserDTO } from '../models/user.dto';
import { UserModel } from '../models/user.model';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private organizationRepository: OrganizationRepository,
    private jwtService: JwtService,
  ) {}

  async createUser(user: UserDTO) {
    const existingUser = await this.userRepository.findByUsername(
      user.username,
    );
    if (existingUser) {
      throw Exceptions.auth.NameTakenException(user.username);
    }
    const encPassword = hashPassword(user.password);
    const newUser = new UserModel(user.username, encPassword);
    return this.userRepository.save(newUser);
  }

  async validateUser(
    username: string,
    pass: string,
  ): Promise<Partial<UserModel>> {
    const user = await this.userRepository.findByUsername(username);
    if (user && validatePassword(pass, user.encPassword)) {
      const { encPassword, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserModel) {
    const payload: IJWT = {
      username: user.username,
      sub: user.id,
      selectedOrganizationId: user.selectedOrganization.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
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

    if (user.currentOrganizationId) {
      const existingOrganization = await this.organizationRepository.getOne(
        user.currentOrganizationId,
        userId,
      );

      if (!existingOrganization) {
        throw Exceptions.organization.NotFoundException(
          user.currentOrganizationId,
        );
      }
      existingUser.selectedOrganizationId = user.currentOrganizationId;
    }
    await this.userRepository.save(existingUser);
    return existingUser;
  }

  async getUser(id: number) {
    const existingUser = await this.userRepository.getOne(id);
    if (!existingUser) {
      throw Exceptions.auth.NotFoundException(id);
    }
    return existingUser;
  }
}

import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { OrganizationRepository } from 'src/modules/organization/repositories/organization.repository';
import { organizationRepositoryMockFactory } from 'src/modules/organization/repositories/organization.repository.mock';
import {
  envFilePath,
  validateEnvironment,
} from 'src/settings/environment.settings';
import { UserDTO } from '../models/user.dto';
import { UserRepository } from '../repositories/user.repository';
import { userRepositoryMockFactory } from '../repositories/mocks/user.repository.mock';
import { AuthService } from './auth.service';
import { jwtServiceMockFactory } from 'src/test/mocks/services/jwt.service.mock';
import { createMockUser } from 'src/test/mocks/models/user.mock';
import { BadRequestException } from '@nestjs/common';

describe('Test Auth Service', () => {
  let authService: AuthService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          validate: validateEnvironment,
          envFilePath: envFilePath,
        }),
      ],
      providers: [
        AuthService,
        {
          provide: JwtService,
          useFactory: jwtServiceMockFactory,
        },
        {
          provide: UserRepository,
          useFactory: userRepositoryMockFactory,
        },
        {
          provide: OrganizationRepository,
          useFactory: organizationRepositoryMockFactory,
        },
      ],
    }).compile();

    authService = module.get(AuthService);
    userRepository = module.get(UserRepository);
  });

  describe('CreateUser', () => {
    it('Should return valid user if provided unused username and password', async () => {
      const mockUser: UserDTO = {
        username: 'Some New User',
        password: 'test',
      };
      userRepository.findByUsername = jest.fn(() => Promise.resolve(null));
      const result = await authService.createUser(mockUser);
      expect(result).toEqual({
        ...createMockUser({
          username: mockUser.username,
          id: 1,
          encPassword: '8d1dde9bc7230e24b8f87e6cb75d5d6a',
        }),
      });
    });

    it('Should fail if username exist', async () => {
      const mockUser: UserDTO = {
        username: 'Some New User',
        password: 'test',
      };

      try {
        await authService.createUser(mockUser);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
        expect(e.response).toEqual({
          error: 'Username Some New User is already taken',
          code: '10001',
        });
      }
    });
  });
});

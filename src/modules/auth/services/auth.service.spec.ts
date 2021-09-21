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

describe('Test [AuthService]', () => {
  let authService: AuthService;
  let userRepository: UserRepository;
  let jwtService: JwtService;

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
    jwtService = module.get(JwtService);
  });

  describe('[createUser]', () => {
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

  describe('[validateUser]', () => {
    it('should return user if user exists in database', async () => {
      const result = await authService.validateUser('test', 'test');
      expect(result.id).toBeDefined();
    });

    it('should return null if user does not exist', async () => {
      userRepository.findByUsername = jest.fn(() => Promise.resolve(null));
      const result = await authService.validateUser('test1', 'test');
      expect(result).toBeNull();
    });

    it('should return null if password is invalid', async () => {
      const result = await authService.validateUser('test', 'wrongpassword');
      expect(result).toBeNull();
    });
  });

  describe('[createAccessToken]', () => {
    it('Should call jwt service with correct fields', async () => {
      const jwtSign = jest.spyOn(jwtService, 'sign');
      const mockUser = createMockUser();
      await authService.createAccessToken(mockUser);
      expect(jwtSign).toHaveBeenCalledWith({
        username: mockUser.username,
        sub: mockUser.id,
        selectedOrganizationId: mockUser.selectedOrganization?.id,
      });
    });
  });
});

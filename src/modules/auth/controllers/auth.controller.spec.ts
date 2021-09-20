import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  envFilePath,
  validateEnvironment,
} from '../../../settings/environment.settings';
import databaseSettings from '../../../settings/database.settings';
import { AuthModule } from '../auth.module';
import { UserModel } from '../models/user.model';
import { USER_DUMP } from 'src/dumps/db.dump';
import * as request from 'supertest';
import { Routes } from 'src/routes';
import { UserDTO } from '../models/user.dto';
import { UserRepository } from '../repositories/user.repository';
import { Repository } from 'src/shared/repository';

describe('Test Auth module', () => {
  let app: INestApplication;
  let repository: Repository<UserModel>;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          validate: validateEnvironment,
          envFilePath: envFilePath,
        }),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: databaseSettings,
          inject: [ConfigService],
        }),
        AuthModule,
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    repository = module.get(UserRepository);
  });

  beforeEach(async () => {
    await repository.query(
      `DELETE FROM user_model; 
       DELETE FROM organization_model;
       DELETE FROM user_organization`,
    );
    await repository.query(USER_DUMP);
  });

  afterAll(async () => {
    await repository.query(
      `DELETE FROM user_model; 
       DELETE FROM organization_model;
       DELETE FROM user_organization`,
    );
    await app.close();
  });

  describe('POST /register', () => {
    it('should successfully register user if provided username and password', async () => {
      const newUser: UserDTO = {
        username: 'New User 1',
        password: 'test',
      };

      const response = await request(app.getHttpServer())
        .post(`/${Routes.auth.root}/${Routes.auth.register}`)
        .send(newUser);
      const createdUser = response.body as UserModel;

      expect(createdUser.username).toEqual(newUser.username);
      expect(createdUser.encPassword).toBeUndefined();
    });

    it('should fail if provided username is taken', async () => {
      const newUser: UserDTO = {
        username: 'galeksic',
        password: 'test',
      };

      const response = await request(app.getHttpServer())
        .post(`/${Routes.auth.root}/${Routes.auth.register}`)
        .send(newUser)
        .expect(400);
      expect(response.body).toEqual({
        error: 'Username galeksic is already taken',
        code: '10001',
      });
    });
  });
});

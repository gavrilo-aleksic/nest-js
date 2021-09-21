import { INestApplication } from '@nestjs/common';
import { UserModel } from '../models/user.model';
import { USER_DUMP } from 'src/dumps/db.dump';
import * as request from 'supertest';
import { Routes } from 'src/routes';
import { UpdateUserDTO, UserDTO } from '../models/user.dto';
import { UserRepository } from '../repositories/user.repository';
import { Repository } from 'src/shared/repository';
import { createMockApp, getToken } from 'src/shared/utils/test.utils';

describe('Test Auth module', () => {
  let app: INestApplication;
  let repository: Repository<UserModel>;

  beforeAll(async () => {
    const module = await createMockApp();

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

  describe('GET /profile', () => {
    it('Should fail if token is invalid', async () => {
      await request(app.getHttpServer())
        .get(`/${Routes.auth.root}/${Routes.auth.profile}`)
        .send()
        .expect(401);
    });

    it('Should return user profile if user is logged in', async () => {
      const access_token = await getToken(app, 'test', 'test');

      const { body } = await request(app.getHttpServer())
        .get(`/${Routes.auth.root}/${Routes.auth.profile}`)
        .send()
        .set('Authorization', `Bearer ${access_token}`);
      expect(body).toEqual({
        username: 'test',
        id: 3,
        createdAt: '2021-09-19T06:37:17.841Z',
        updatedAt: '2021-09-19T06:37:17.841Z',
        selectedOrganization: {
          name: 'Default Organization',
          id: 1,
          createdAt: '2021-09-20T10:06:25.319Z',
          updatedAt: '2021-09-20T10:06:25.319Z',
        },
      });
    });
  });

  describe('PUT /', () => {
    it('Should update user password', async () => {
      const access_token = await getToken(app, 'test', 'test');

      await request(app.getHttpServer())
        .put(`/${Routes.auth.root}`)
        .send({ password: 'newPassword' } as UpdateUserDTO)
        .set('Authorization', `Bearer ${access_token}`);

      const new_token = await getToken(app, 'test', 'newPassword');
      expect(new_token).toBeDefined();
    });

    it('Should throw error if organization does not exist', async () => {
      const access_token = await getToken(app, 'test', 'test');

      await request(app.getHttpServer())
        .put(`/${Routes.auth.root}`)
        .send({ currentOrganizationId: 111 } as UpdateUserDTO)
        .set('Authorization', `Bearer ${access_token}`)
        .expect(404);
    });
  });
});

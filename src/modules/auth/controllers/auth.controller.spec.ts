import { INestApplication } from '@nestjs/common';
import { UserModel } from '../models/user.model';
import { USER_DUMP } from 'src/dumps/db.dump';
import * as request from 'supertest';
import { Routes } from 'src/routes';
import { UpdateUserDTO, CreateUserDTO } from '../models/user.dto';
import { UserRepository } from '../repositories/user.repository';
import { Repository } from 'src/shared/repository';
import { createMockApp, getToken } from 'src/shared/utils/test.utils';
import { defaultOrganizationName } from 'src/modules/organization/models/organization.model';

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
      `DELETE FROM user_organization;
       DELETE FROM user_model; 
       DELETE FROM organization_model;`,
    );
    await repository.query(USER_DUMP);
  });

  afterAll(async () => {
    await repository.query(
      `DELETE FROM user_organization;
       DELETE FROM user_model; 
       DELETE FROM organization_model;`,
    );
    await app.close();
  });

  describe('POST /register', () => {
    it('should successfully register user if provided username and password', async () => {
      const newUser: CreateUserDTO = {
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

    it('should successfully register user with new organization if isAdmin', async () => {
      const newUser: CreateUserDTO = {
        username: 'New User 1',
        password: 'test',
        isAdmin: true,
      };
      const response = await request(app.getHttpServer())
        .post(`/${Routes.auth.root}/${Routes.auth.register}`)
        .send(newUser);

      const createdUser = response.body as UserModel;
      expect(createdUser.organizations).toBeDefined();
      expect(createdUser.organizations[0].name).toEqual(
        defaultOrganizationName(),
      );
    });

    it('should fail if provided username is taken', async () => {
      const newUser: CreateUserDTO = {
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

  describe('GET /profile/:id?', () => {
    it('Should fail if token is invalid', async () => {
      await request(app.getHttpServer())
        .get(`/${Routes.auth.root}/${Routes.auth.profile}`)
        .send()
        .expect(401);
    });

    it('Should return user profile if user is logged in', async () => {
      const access_token = await getToken(app, 'test', 'test');

      const { body } = await request(app.getHttpServer())
        .get(`/${Routes.auth.root}/profile`)
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

    it('Should throw invalid request if :id param not integer', async () => {
      const access_token = await getToken(app, 'test', 'test');
      await request(app.getHttpServer())
        .get(`/${Routes.auth.root}/profile/a`)
        .send()
        .set('Authorization', `Bearer ${access_token}`)
        .expect(400);
    });
  });

  describe('PUT /', () => {
    it('Should update user password of different user', async () => {
      const access_token = await getToken(app, 'galeksic', 'test');

      await request(app.getHttpServer())
        .put(`/${Routes.auth.root}`)
        .send({ password: 'newPassword', userId: 1 } as UpdateUserDTO)
        .set('Authorization', `Bearer ${access_token}`);
      const new_token = await getToken(app, 'galeksic', 'newPassword');
      expect(new_token).toBeDefined();
    });

    it('Should throw error if organization does not exist', async () => {
      const access_token = await getToken(app, 'test', 'test');

      await request(app.getHttpServer())
        .put(`/${Routes.auth.root}`)
        .send({ selectedOrganizationId: 111 } as UpdateUserDTO)
        .set('Authorization', `Bearer ${access_token}`)
        .expect(404);
    });

    it('Should throw error if organization does not exist on user', async () => {
      const access_token = await getToken(app, 'test', 'test');

      await request(app.getHttpServer())
        .put(`/${Routes.auth.root}`)
        .send({ selectedOrganizationId: 2 } as UpdateUserDTO)
        .set('Authorization', `Bearer ${access_token}`)
        .expect(404);
    });

    it('Should update selected organization if organizationId exists on user', async () => {
      const access_token = await getToken(app, 'test', 'test');

      const { body } = await request(app.getHttpServer())
        .put(`/${Routes.auth.root}`)
        .send({ selectedOrganizationId: 3 } as UpdateUserDTO)
        .set('Authorization', `Bearer ${access_token}`);
      expect((<UserModel>body).selectedOrganization.id).toEqual(3);
    });

    it('Should update user sending request if no userId provided', async () => {
      const access_token = await getToken(app, 'test', 'test');

      const { body } = await request(app.getHttpServer())
        .put(`/${Routes.auth.root}`)
        .send({ selectedOrganizationId: 3 } as UpdateUserDTO)
        .set('Authorization', `Bearer ${access_token}`);
      expect((<UserModel>body).selectedOrganization.id).toEqual(3);
      expect((<UserModel>body).id).toEqual(3);
    });
  });
});

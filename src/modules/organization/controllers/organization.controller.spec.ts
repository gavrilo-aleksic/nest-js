import { INestApplication } from '@nestjs/common';
import { USER_DUMP } from 'src/dumps/db.dump';
import * as request from 'supertest';
import { Repository } from 'src/shared/repository';
import { createMockApp, getToken } from 'src/shared/utils/test.utils';
import { OrganizationRepository } from '../repositories/organization.repository';
import { Routes } from 'src/routes';
import { OrganizationPostDTO } from '../models/organization.dto';

describe('Test Organization Controller', () => {
  let app: INestApplication;
  let repository: Repository<OrganizationRepository>;

  beforeAll(async () => {
    const module = await createMockApp();

    app = module.createNestApplication();
    await app.init();
    repository = module.get(OrganizationRepository);
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

  describe('POST /organization', () => {
    it('Should create organization for user and set him as admin', async () => {
      const accessToken = await getToken(app, 'test', 'test');

      const { body } = await request(app.getHttpServer())
        .post(`/${Routes.organization.root}`)
        .send({ name: 'New Organization For Testing' } as OrganizationPostDTO)
        .set('Authorization', `Bearer ${accessToken}`);
      expect(body).toMatchObject({ name: 'New Organization For Testing' });
    });
  });
});

import * as request from 'supertest';
import { Routes } from 'src/routes';
import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/modules/auth/auth.module';
import databaseSettings from 'src/settings/database.settings';
import {
  validateEnvironment,
  envFilePath,
} from 'src/settings/environment.settings';

export const createMockApp = async () =>
  await Test.createTestingModule({
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
    providers: [
      {
        provide: APP_INTERCEPTOR,
        useClass: ClassSerializerInterceptor,
      },
      {
        provide: APP_PIPE,
        useFactory: () => new ValidationPipe({ whitelist: true }),
      },
    ],
  }).compile();

export const getToken = async (
  app: INestApplication,
  username: string,
  password: string,
) => {
  const {
    body: { accessToken },
  } = await request(app.getHttpServer())
    .post(`/${Routes.auth.root}/${Routes.auth.login}`)
    .send({ username, password });

  return accessToken;
};

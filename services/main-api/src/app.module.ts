import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/modules/auth/auth.module';
import { HealthModule } from 'src/modules/health/health.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrganizationModule } from './modules/organization/organization.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseSettings from './settings/database.settings';
import {
  envFilePath,
  validateEnvironment,
} from './settings/environment.settings';
import { AttributeModule } from './modules/attributes/attribute.module';
import { APP_GUARD } from '@nestjs/core';
import { OrganizationGuard } from './shared/guards/organization.guard';

@Module({
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
    HealthModule,
    OrganizationModule,
    AttributeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from 'src/modules/auth/controllers/auth.controller';
import { UserRepository } from 'src/modules/auth/repositories/user.repository';
import { AuthService } from 'src/modules/auth/services/auth.service';
import JWTOptions from 'src/settings/auth.settings';
import { OrganizationModule } from '../organization/organization.module';
import { JwtStrategy } from './services/jwt-auth.service';
import { LocalStrategy } from './services/local-auth.service';

@Module({
  imports: [JwtModule.register(JWTOptions), OrganizationModule],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, LocalStrategy, JwtStrategy],
})
export class AuthModule {}

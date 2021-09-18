import { Module } from '@nestjs/common';
import { AuthController } from 'src/modules/auth/controllers/auth.controller';
import { UserRepository } from 'src/modules/auth/repositories/user.repository';
import { AuthService } from 'src/modules/auth/services/auth.service';

@Module({
  imports: [AuthController],
  providers: [AuthService, UserRepository],
})
export class AuthModule {}

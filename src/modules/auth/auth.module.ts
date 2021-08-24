import { Module } from '@nestjs/common';
import { UserRepository } from 'src/modules/auth/repositories/user.repository';
import { AuthService } from 'src/modules/auth/services/auth.service';

@Module({
  imports: [],
  providers: [AuthService, UserRepository],
})
export class AuthModule {}

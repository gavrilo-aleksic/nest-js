import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserOrganizationRepository } from 'src/modules/auth/repositories/user-organization.repository';
import { MailService } from './services/mail.service';

@Module({
  imports: [ConfigModule],
  providers: [MailService, UserOrganizationRepository],
  exports: [MailService, UserOrganizationRepository],
})
export class SharedModule {}

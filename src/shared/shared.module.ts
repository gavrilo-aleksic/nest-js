import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailService } from './services/mail.service';

@Module({
  imports: [ConfigModule],
  providers: [MailService],
})
export class SharedModule {}
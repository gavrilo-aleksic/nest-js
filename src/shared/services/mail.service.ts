import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ENVIRONMENT_KEYS } from 'src/settings/environment.settings';

@Injectable()
export class MailService {
  constructor(private configService: ConfigService) {}
  sendMail(data: IMail) {
    const transporter = nodemailer.createTransport({
      host: this.configService.get<string>(ENVIRONMENT_KEYS.MAIL_HOST),
      port: this.configService.get<string>(ENVIRONMENT_KEYS.MAIL_PORT),
      secure: true, // true for 465, false for other ports
      auth: {
        user: this.configService.get<string>(ENVIRONMENT_KEYS.MAIL_USER_NAME),
        pass: this.configService.get<string>(ENVIRONMENT_KEYS.MAIL_PASSWORD),
      },
    });
    return transporter.sendMail(data);
  }
}

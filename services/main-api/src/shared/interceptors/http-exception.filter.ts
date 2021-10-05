import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { IRequest } from 'src/@types/api';

import { CustomLoggerService } from '../../modules/logger/services/logger.service';
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: CustomLoggerService) {}

  private caughtStatuses = [404, 400, 500];

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<IRequest>();
    const status = exception.getStatus();
    if (this.caughtStatuses.includes(status)) {
      this.logger.error({
        error: exception,
        url: request.url,
        user: request.user,
      });
    }
    const errorResponse = exception.getResponse() as any;
    response.status(status).json({
      message:
        typeof errorResponse === 'string'
          ? errorResponse
          : errorResponse.message,
      statusCode:
        typeof errorResponse === 'string'
          ? errorResponse
          : errorResponse.statusCode,
    });
  }
}

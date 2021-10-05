import { ConsoleLogger, HttpException, LoggerService } from '@nestjs/common';
import { ILogError } from 'src/@types/api';
import { MongoDBService } from './mongoDB.service';

export class CustomLoggerService
  extends ConsoleLogger
  implements LoggerService
{
  private mongoDBService: MongoDBService;

  constructor() {
    super();
    this.mongoDBService = new MongoDBService();
    this.mongoDBService.connect();
  }

  /**
   * Write an 'error' level log.
   */
  error(
    errorDetails: { error: HttpException; url: string; user?: IJWT },
    ...optionalParams: any[]
  ) {
    const error = errorDetails.error.getResponse() as any;
    const logError: ILogError = {
      error: {
        raw: typeof error === 'string' ? error : undefined,
        code: error.statusCode,
        message: error.message,
      },
      url: errorDetails.url,
      user: errorDetails.user,
      stack: errorDetails.error.stack,
    };
    if (process.env.ENV === 'TEST') {
      return console.log(error);
    }
    console.error(logError);
    this.mongoDBService.log(logError);
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {}

  /**
   * Write a 'debug' level log.
   */
  debug(message: any, ...optionalParams: any[]) {}

  /**
   * Write a 'verbose' level log.
   */
  verbose(message: any, ...optionalParams: any[]) {}
}

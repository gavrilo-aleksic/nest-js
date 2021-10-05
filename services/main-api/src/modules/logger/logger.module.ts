import { Global, Module } from '@nestjs/common';
import { EventsModule } from '../events/events.module';
import { CustomLoggerService } from './services/logger.service';
import { MongoDBService } from './services/mongoDB.service';

@Global()
@Module({
  imports: [EventsModule],
  providers: [CustomLoggerService, MongoDBService],
  exports: [CustomLoggerService],
})
export class LoggerModule {}

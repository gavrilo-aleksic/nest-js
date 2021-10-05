import { Global, Module } from '@nestjs/common';
import { EventsGateway } from 'src/modules/events/events.gateway';

@Global()
@Module({
  providers: [EventsGateway],
  exports: [EventsGateway],
})
export class EventsModule {}

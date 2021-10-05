import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EventsGateway } from 'src/modules/events/events.gateway';
import JWTOptions from 'src/settings/auth.settings';
import { SharedModule } from 'src/shared/shared.module';

@Global()
@Module({
  imports: [JwtModule.register(JWTOptions), SharedModule],
  providers: [EventsGateway],
  exports: [EventsGateway],
})
export class EventsModule {}

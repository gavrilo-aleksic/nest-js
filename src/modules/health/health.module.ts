import { Module } from '@nestjs/common';
import { HealthController } from 'src/modules/health/controllers/health.controller';
import { HealthService } from 'src/modules/health/services/health.service';

@Module({
  imports: [],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}

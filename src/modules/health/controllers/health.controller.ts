import { Controller, Get } from '@nestjs/common';
import { HealthService } from 'src/modules/health/services/health.service';

@Controller({ path: 'health' })
export class HealthController {
  constructor(private healthService: HealthService) {}
  @Get()
  getHealth() {
    return this.healthService.getOkHealth();
  }
}

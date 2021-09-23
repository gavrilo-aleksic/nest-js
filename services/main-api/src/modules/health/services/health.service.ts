import { Injectable } from '@nestjs/common';
import {
  HealthModel,
  HEALTH_MODEL_STATUS,
} from 'src/modules/health/models/health.model';

@Injectable()
export class HealthService {
  getOkHealth(): HealthModel {
    return new HealthModel(HEALTH_MODEL_STATUS.OK);
  }
}

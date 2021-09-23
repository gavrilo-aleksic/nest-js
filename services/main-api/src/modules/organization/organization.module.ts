import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { OrganizationController } from './controllers/organization.controller';
import { OrganizationRepository } from './repositories/organization.repository';
import { OrganizationService } from './services/organization.service';
@Module({
  imports: [SharedModule],
  controllers: [OrganizationController],
  providers: [OrganizationService, OrganizationRepository],
  exports: [OrganizationRepository],
})
export class OrganizationModule {}

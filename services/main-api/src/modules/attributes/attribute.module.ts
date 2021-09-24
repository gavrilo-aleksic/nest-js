import { Module } from '@nestjs/common';
import { OrganizationModule } from '../organization/organization.module';
import { AttributeController } from './controllers/attribute.controller';
import { AttributeRepository } from './repositories/attribute.repository';
import { AttributeService } from './services/attribute.service';

@Module({
  controllers: [AttributeController],
  imports: [OrganizationModule],
  providers: [AttributeService, AttributeRepository],
})
export class AttributeModule {}

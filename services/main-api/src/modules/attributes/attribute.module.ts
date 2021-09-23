import { Module } from '@nestjs/common';
import { AttributeController } from './controllers/attribute.controller';
import { AttributeRepository } from './repositories/attribute.repository';
import { AttributeService } from './services/attribute.service';

@Module({
  imports: [AttributeController],
  providers: [AttributeService, AttributeRepository],
})
export class AttributeModule {}

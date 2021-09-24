import { IsBoolean, IsEnum, IsIn, IsOptional, IsString } from 'class-validator';
import { AttributeTypeEnum, AttributeTypes } from './attribute-type.enum';

export class CreateAttributeDTO {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  displayName: string;

  @IsBoolean()
  @IsOptional()
  required: boolean;

  @IsIn(AttributeTypes)
  @IsOptional()
  type: AttributeTypeEnum;
}

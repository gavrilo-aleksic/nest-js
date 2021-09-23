import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDefined,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsDefined()
  public username: string;

  @IsString()
  @IsDefined()
  public password: string;

  @IsBoolean()
  @IsOptional()
  public isAdmin?: boolean;

  @IsOptional()
  @IsArray()
  @Type(() => Number)
  public organizationIds?: number[];
}

export class UpdateUserDTO {
  @IsString()
  @IsOptional()
  public password: string;

  @IsNumber()
  @IsOptional()
  public selectedOrganizationId: number;

  @IsInt()
  @IsOptional()
  public userId: number;
}

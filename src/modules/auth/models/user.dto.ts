import {
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

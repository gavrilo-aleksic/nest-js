import {
  IsDefined,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserDTO {
  @IsString()
  @IsDefined()
  public username: string;

  @IsString()
  @IsDefined()
  public password: string;
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

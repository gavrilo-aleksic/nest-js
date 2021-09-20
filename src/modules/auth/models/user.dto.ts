import { IsDefined, IsInt, IsString } from 'class-validator';

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
  @IsDefined()
  public password: string;

  @IsInt()
  public currentOrganizationId: number;

  @IsInt()
  public userId: number;
}

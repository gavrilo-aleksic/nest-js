import { IsDefined, IsString } from 'class-validator';

export class UserDTO {
  @IsString()
  @IsDefined()
  public username: string;

  @IsString()
  @IsDefined()
  public password: string;
}

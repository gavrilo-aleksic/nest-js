import { IsString } from 'class-validator';

export class OrganizationPostDTO {
  @IsString()
  name?: string;
}

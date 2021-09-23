import { IsOptional, IsString } from 'class-validator';

export class OrganizationPostDTO {
  @IsString()
  @IsOptional()
  name?: string;
}

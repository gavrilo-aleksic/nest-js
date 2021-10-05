import { IsOptional, IsString } from 'class-validator';

export class OrganizationPostDTO {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  displayName?: string;
}

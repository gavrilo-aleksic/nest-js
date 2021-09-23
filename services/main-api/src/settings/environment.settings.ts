import { plainToClass } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsString,
  validateSync,
} from 'class-validator';

enum Environment {
  Development = 'dev',
  Production = 'prod',
  Test = 'test',
}

export const ENVIRONMENT_KEYS = {
  DATABASE_TYPE: 'DATABASE_TYPE',
  DATABASE_HOST: 'DATABASE_HOST',
  DATABASE_PORT: 'DATABASE_PORT',
  DATABASE_USERNAME: 'DATABASE_USERNAME',
  DATABASE_PASSWORD: 'DATABASE_PASSWORD',
  DATABASE_NAME: 'DATABASE_NAME',
  MAIL_USER_NAME: 'MAIL_USER_NAME',
  MAIL_PASSWORD: 'MAIL_PASSWORD',
  MAIL_HOST: 'MAIL_HOST',
  MAIL_PORT: 'MAIL_PORT',
  ENV: 'ENV',
} as const;

class EnvironmentVariables {
  @IsEnum(Environment)
  ENV: Environment;

  @IsNumber()
  DATABASE_PORT: number;

  @IsString()
  DATABASE_TYPE: string;

  @IsString()
  DATABASE_HOST: string;

  @IsString()
  DATABASE_USERNAME: string;

  @IsString()
  DATABASE_PASSWORD: string;

  @IsString()
  DATABASE_NAME: string;

  @IsString()
  MAIL_USER_NAME: string;

  @IsString()
  MAIL_PASSWORD: string;

  @IsString()
  MAIL_HOST: string;

  @IsNumber()
  MAIL_PORT: number;
}

export const validateEnvironment = (config: Record<string, unknown>) => {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
};

export const envFilePath = `${process.env.NODE_ENV || 'dev'}.env`.replace(
  ' ',
  '',
);

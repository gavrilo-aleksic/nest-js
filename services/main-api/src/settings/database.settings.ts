import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ENTITIES } from './entities';
import { ENVIRONMENT_KEYS } from './environment.settings';

const databaseSettings = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  return {
    type: configService.get<string>(ENVIRONMENT_KEYS.DATABASE_TYPE) as any,
    host: configService.get<string>(ENVIRONMENT_KEYS.DATABASE_HOST),
    port: parseInt(configService.get<string>(ENVIRONMENT_KEYS.DATABASE_PORT)),
    username: configService.get<string>(ENVIRONMENT_KEYS.DATABASE_USERNAME),
    password: configService.get<string>(ENVIRONMENT_KEYS.DATABASE_PASSWORD),
    database: configService.get<string>(ENVIRONMENT_KEYS.DATABASE_NAME),
    entities: ENTITIES,
    migrationsTableName: 'custom_migration_table',
    migrations: ['migration/*.ts'],
    cli: {
      migrationsDir: 'migration',
    },
    logging: configService.get<string>('ENV') === 'test' ? false : true,
    synchronize: true,
  };
};

export default databaseSettings;

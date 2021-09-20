import { JwtModuleOptions } from '@nestjs/jwt';

const JWTOptions: JwtModuleOptions = {
  secret: 'secret',
  signOptions: { expiresIn: '10h' },
};

export default JWTOptions;

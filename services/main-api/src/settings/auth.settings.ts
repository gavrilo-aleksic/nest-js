import { JwtModuleOptions } from '@nestjs/jwt';

export const JWT_SECRET = 'WRPcmdhbml6YXRpb25JZCI6MjUsImlh';

const JWTOptions: JwtModuleOptions = {
  secret: JWT_SECRET,
};

export default JWTOptions;

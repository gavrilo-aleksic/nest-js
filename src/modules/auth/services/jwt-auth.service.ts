import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IJWT } from 'src/@types/api';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret',
    });
  }

  validate(payload: IJWT): IJWT {
    return {
      sub: payload.sub,
      username: payload.username,
      selectedOrganizationId: payload.selectedOrganizationId,
    };
  }
}

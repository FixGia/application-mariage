import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './types/jwt-payload.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'dev_secret_key',
    });
  }

  async validate(payload: JwtPayload) {
    return payload; // au lieu de { userId: payload.sub, email: payload.email }
  }
}

// types/jwt-payload.type.ts :
// export type JwtPayload = { sub: string; email: string; };

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
// provider
import { ConfigService } from '@nestjs/config';
// library
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtAuthGuard extends PassportStrategy(Strategy, 'jwt') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any): Promise<{ id: string; email: string; username: string; }> {
    return { id: payload.id, email: payload.email, username: payload.username };
  }
}

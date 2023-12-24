import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class LocalUserStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
  ) {
    super({
      // 무엇을 기준으로
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    return await this.authService.loginUSer({
      email,
      password,
    })
  }
}
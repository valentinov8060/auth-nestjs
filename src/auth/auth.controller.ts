import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() RegisterDto: RegisterDto) {
    const response = await this.authService.register(RegisterDto.email, RegisterDto.username, RegisterDto.password);
    return {
      data: response
    };
  }

  @Post('login')
  async login(@Body() LoginDto: LoginDto) {
    const response = await this.authService.login(LoginDto.email, LoginDto.password);
    return {
      data: response
    };
  }

}

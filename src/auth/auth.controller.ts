import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() RegisterUserDto: RegisterUserDto) {
    const response = await this.authService.register(RegisterUserDto.email, RegisterUserDto.username, RegisterUserDto.password);
    return {
      data: response
    };
  }

}

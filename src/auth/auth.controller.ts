import { Controller, Request, Body, Post, Get, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, UpdateDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() RegisterDto: RegisterDto) {
    const response = await this.authService.register(RegisterDto.email, RegisterDto.username, RegisterDto.password);
    return {
      data: response,
    };
  }

  @Post('login')
  async login(@Body() LoginDto: LoginDto) {
    const response = await this.authService.login(LoginDto.email, LoginDto.password);
    return {
      data: response,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  Me(@Request() req) {
    const response = { user: req.user };
    return {  
      data: response,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('update')
  async update(@Request() req, @Body() UpdateDto: UpdateDto) {
    const response = await this.authService.update(req.user, UpdateDto);
    return {
      data: response,
    };
  }

}

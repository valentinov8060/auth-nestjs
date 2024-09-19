import { Module } from '@nestjs/common';
// module
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
// provider
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../jwt-auth.guard';
// controller
import { AuthController } from './auth.controller';
// entity
import { User } from '../entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule,
    PassportModule,
  ],
  providers: [
    AuthService,
    JwtAuthGuard, 
  ],
  controllers: [AuthController],
})
export class AuthModule {}

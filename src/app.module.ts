import { Module } from '@nestjs/common';
// config
import { ConfigModule, ConfigService } from '@nestjs/config';
// typeorm
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
// custom module
import { AuthModule } from './auth/auth.module';
// entity
import { User } from './entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.local',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: 'postgres',
        host: configService.get<string>('TYPEORM_HOST'),
        port: configService.get<number>('TYPEORM_PORT'),
        username: configService.get<string>('TYPEORM_USERNAME'),
        password: configService.get<string>('TYPEORM_PASSWORD'),
        database: configService.get<string>('TYPEORM_DATABASE'),
        entities: [User],
        synchronize: true,
        logging: false,
      }),
    }),
    AuthModule,
  ],
})
export class AppModule {}

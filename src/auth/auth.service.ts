import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// provider
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
// entity
import { User } from '../entity';
// library
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import Hashids from 'hashids';

@Injectable()
export class AuthService {
  private readonly jwtSecret: string;
  private readonly hashids: Hashids;
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private configService: ConfigService,
  ) {
    this.jwtSecret = this.configService.get<string>('JWT_SECRET');
    this.hashids = new Hashids(this.configService.get<string>('HASHIDS_SALT'), 10, 'abcdefghijklmnopqrstuvwxyz1234567890');
  }

  // Fungsi register
  async register(email: string, username: string, password: string): Promise<{ token: string; user: { id: string; email: string; username: string; } }> {
    const existingEmailUser = await this.userRepository.findOne({ where: { email } });
    if (existingEmailUser) {
      throw new BadRequestException('Email already registered');
    }
    const existingUsernameUser = await this.userRepository.findOne({ where: { username } });
    if (existingUsernameUser) {
      throw new BadRequestException('Username already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({ email, username, password: hashedPassword });

    const savedUser = await this.userRepository.save(newUser);

    const id = this.hashids.encode(savedUser.id);
    const token = jwt.sign({ id, email: savedUser.email, username: savedUser.username }, this.jwtSecret, {
      expiresIn: '1h',
    });

    return {
      token,
      user: {
        id,
        email: savedUser.email,
        username: savedUser.username,
      }
    }
  }

  // Fungsi login
  async login(email: string, password: string): Promise<{ token: string; user: { id: string; email: string; username: string; } }> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const id = this.hashids.encode(user.id);
    const token = jwt.sign({ id, email: user.email, username: user.username }, this.jwtSecret, {
      expiresIn: '1h',
    });

    return {
      token,
      user: {
        id,
        email: user.email,
        username: user.username,
      }
    }
  }

  // Fungsi me
  async me(user: any): Promise<{ user: { id: string; email: string; username: string; } }> {
    const [idDecoded] = this.hashids.decode(user.id);
    const userId = Number(idDecoded);
    if (!userId) {
      throw new BadRequestException('Invalid user ID');
    }
    const checkUser = await this.userRepository.findOne({ where: { id: userId } });
    if (!checkUser) {
      throw new BadRequestException('User not found');
    }
    return {
      user: {
        id: user.id,
        email: checkUser.email,
        username: checkUser.username,
      }
    }
  }

  // Fungsi update
  async update(user: any, reqBody: { username?: string; password?: string }): Promise<{ token: string; user: { id: string; email: string; username: string; } }> {
    const { username, password } = reqBody;

    // Decode the user ID from the token
    const [idDecoded] = this.hashids.decode(user.id);
    const userId = Number(idDecoded);
    if (!userId) {
      throw new BadRequestException('Invalid user ID');
    }

    // Fetch the current user from the database
    const userToUpdate = await this.userRepository.findOne({ where: { id: userId } });
    if (!userToUpdate) {
      throw new BadRequestException('User not found');
    }

    // Update username if provided
    if (username) {
      userToUpdate.username = username;
    }

    // Update password if provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      userToUpdate.password = hashedPassword;
    }

    // Save updated user to the database
    const updatedUser = await this.userRepository.save(userToUpdate);

    // Generate a new JWT token with updated user information
    const token = jwt.sign({ id: user.id, email: updatedUser.email, username: updatedUser.username }, this.jwtSecret, { 
      expiresIn: '1h' 
    });

    return {
      token,
      user: {
        id: user.id,
        email: updatedUser.email,
        username: updatedUser.username,
      },
    };
  }

}
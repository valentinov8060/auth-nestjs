import { BadRequestException, UnauthorizedException  } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './auth.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;
  let userRepository: any;
  let hashidsMock: any;

  beforeEach(async () => {
    userRepository = {
      findOne: jest.fn(),
    };

    hashidsMock = {
      decode: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn(),
            login: jest.fn(),
            me: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: 'UserRepository',
          useValue: userRepository,
        },
        {
          provide: 'Hashids',
          useValue: hashidsMock,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
    (service as any).hashids = hashidsMock; 
  });

  describe('register', () => {
    it('should successfully register a user', async () => {
      const registerDto: RegisterDto = { 
        email: "user3@example.com",
        password: "securePassword123",
        username: "valentinov80603" 
      };

      const registerResult = {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        user: {
          id: "encodedId",
          email: registerDto.email,
          username: registerDto.username,
        }
      };

      jest.spyOn(service, 'register').mockResolvedValue(registerResult);

      const result = await controller.register(registerDto);

      expect(service.register).toHaveBeenCalledWith(registerDto.email, registerDto.username, registerDto.password);
      expect(result).toEqual({ data: registerResult });
    });

    it('should throw BadRequestException if email is already registered', async () => {
      const registerDto: RegisterDto = { 
        email: "user3@example.com",
        password: "securePassword123",
        username: "valentinov80603" 
      };

      jest.spyOn(service, 'register').mockRejectedValue(new BadRequestException('Email already registered'));

      await expect(controller.register(registerDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if username is already registered', async () => {
      const registerDto: RegisterDto = { 
        email: "user3@example.com",
        password: "securePassword123",
        username: "valentinov80603" 
      };

      jest.spyOn(service, 'register').mockRejectedValue(new BadRequestException('Username already registered'));

      await expect(controller.register(registerDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('login', () => {
    it('should return a token and user info on successful login', async () => {
      const loginDto: LoginDto = { 
        email: 'user@example.com',
        password: 'securePassword',
      };

      const loginResult = {
        token: 'mocked-token',
        user: {
          id: 'mocked-id',
          email: loginDto.email,
          username: 'mocked-username',
        },
      };

      jest.spyOn(service, 'login').mockResolvedValue(loginResult);

      const result = await controller.login(loginDto);

      expect(service.login).toHaveBeenCalledWith(loginDto.email, loginDto.password);
      expect(result).toEqual({
        data: loginResult,
      });
    });

    it('should throw BadRequestException if email is invalid', async () => {
      const loginDto: LoginDto = { 
        email: 'invalid@example.com',
        password: 'securePassword',
      };

      // Simulasikan exception ketika AuthService.login dipanggil dengan email yang tidak valid
      jest.spyOn(service, 'login').mockRejectedValue(new BadRequestException('Invalid email'));

      // Cek apakah login melemparkan BadRequestException
      try {
        await controller.login(loginDto);
      } catch (error) {
        expect(service.login).toHaveBeenCalledWith(loginDto.email, loginDto.password);
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('Invalid email');
      }
    });
  });

  describe('me', () => {
    it('should return the user data if valid user ID is provided', async () => {
      const user = { id: 'encodedUserId' }; // Mocked user object

      const checkUser = {
        user: {
          id: '1',
          email: 'user@example.com',
          username: 'valentinov8060',
        }
      };

      // Mock the service method
      jest.spyOn(service, 'me').mockResolvedValue(checkUser);

      // Call the controller method
      const result = await controller.Me({ user });

      // Check if service method was called
      expect(service.me).toHaveBeenCalledWith(user);
      expect(result).toEqual({
        data: {
          user: {
            id: checkUser.user.id,
            email: checkUser.user.email,
            username: checkUser.user.username,
          },
        },
      });
    });
  });

});

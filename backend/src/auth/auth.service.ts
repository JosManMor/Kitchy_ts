import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreatedUser } from './interfaces/created-user.interface';
import { AuthPayload } from './interfaces/auth-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterDto): Promise<CreatedUser | null> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.authRepository.createUser({
      ...data,
      password: hashedPassword,
    });
    return user;
  }

  async login(data: LoginDto): Promise<AuthPayload> {
    const user = await this.authRepository.findUserByEmail(data.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = await this.jwtService.signAsync({
      id: user.id,
    });
    return {
      token: token,
      user: {
        email: user.email,
        username: user.username,
        role: user.role,
      },
    };
  }
}

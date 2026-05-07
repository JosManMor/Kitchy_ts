import { Controller, Post, Body, Res } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { RegisterResponseDto } from './dto/register-response.dto';
import { RegisterDto } from './dto/register.dto';
import { setAuthCookie } from 'src/common/utils/cookies';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register' })
  @ApiCreatedResponse({
    description: 'User successfully registered',
    type: RegisterResponseDto,
  })
  @Post('register')
  async register(
    @Body() registerData: RegisterDto,
  ): Promise<RegisterResponseDto | null> {
    return await this.authService.register(registerData);
  }

  @ApiOperation({ summary: 'Login' })
  @ApiOkResponse({
    description: 'Login successful',
    type: LoginResponseDto,
  })
  @Post('login')
  async login(
    @Body() loginData: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginResponseDto> {
    const payload = await this.authService.login(loginData);
    setAuthCookie(res, payload.token);
    return payload.user;
  }
}

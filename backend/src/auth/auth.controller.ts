import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginData: LoginDto) {
    return this.authService.login(loginData);
  }
  @Post('register')
  register(@Body() registerData: RegisterDto) {
    return this.authService.register(registerData);
  }
}

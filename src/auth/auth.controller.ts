import {
  Body,
  Controller,
  Post,
  Headers,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { AuthForgetDTO } from './dto/auth.forget.dto';
import { AuthResetDTO } from './dto/auth-reset.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { IsEmail } from 'class-validator';
import { AuthGuards } from 'src/guards/auth_guards';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly UserService: UserService,
    private readonly AuthService: AuthService,
  ) {}
  @Post('login')
  async login(@Body() { email, password }: AuthLoginDTO) {
    return this.AuthService.login(email, password);
  }

  @Post('register')
  async register(@Body() data: AuthRegisterDTO) {
    return this.AuthService.register(data);
  }

  @Post('forget')
  async forget(@Body() { email }: AuthForgetDTO) {
    return this.AuthService.forget(email);
  }

  @Post('reset')
  async reset(@Body() { password, token }: AuthResetDTO) {
    return this.AuthService.reset(password, token);
  }

  @UseGuards(AuthGuards)
  @Post('me')
  async me(@Req() req) {
    console.log('Request Token Payload:', req.tokenPayload);
    return { me: 'ok', data: req.tokenPayload };
  }
}

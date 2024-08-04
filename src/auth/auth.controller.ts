import {
  Body,
  Controller,
  Post,
  Headers,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { AuthForgetDTO } from './dto/auth.forget.dto';
import { AuthResetDTO } from './dto/auth-reset.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { IsEmail } from 'class-validator';
import { AuthGuards } from 'src/guards/auth_guards';
import { User } from 'src/decorators/users.decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { writeFile } from 'fs/promises';
import path, {join} from 'path'

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
  async me(@User('email') User) {
    return { User };
  }

  @UseInterceptors(FileInterceptor('File'))
  @UseGuards(AuthGuards)
  @Post('photo')
  async uploadPhoto (@User() User, @UploadedFile() photo: Express.Multer.File) {





   const result = await writeFile(join(__dirname, '..', '..', 'storage', 'photo', `photo-${User.id}.png`), photo.buffer)


    return {result};
  }
}

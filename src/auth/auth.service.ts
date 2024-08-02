import {
  BadRequestException,
  Body,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { PrismaSerive } from 'src/prisma/prisma.service';
import { Prisma, users } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { access } from 'fs';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private readonly JWTservice: JwtService,
    private readonly prisma: PrismaSerive,
    private readonly UserService: UserService,
  ) {}

  async createToken(user: users) {
    return {
      accessToken: this.JWTservice.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        {
          expiresIn: '7d',
          subject: String(user.id),
          issuer: 'login',
          audience: 'users',
        },
      ),
    };
  }

  async checkToken(token: string) {
    try {
      console.log('token recebido:', token);
      const data = this.JWTservice.verify(token, {
        audience: 'users',
        issuer: 'login',
      });
      console.log('dados recebidos', data);
      return data;
    } catch (e) {
      console.log('token verificando erro:', e.message);
      throw new BadRequestException(e);
    }
  }

  async login(email: string, password: string) {
    const user = this.prisma.users.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException(`Email ou senha incorretas`);
    }

   if(! await bcrypt.compare(password, (await user).password)) {
    throw new UnauthorizedException(`Email ou senha incorretas`)
   }

    return this.createToken(await user)
  }

  async forget(email: string) {
    const user = this.prisma.users.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      throw new UnauthorizedException('Email invalido');
    }

    // TD  enviar email
    return true;
  }

  async reset(password: string, token: string) {
    // TD validar o Token...

    const id = 0;
    const user = await this.prisma.users.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });
    return this.createToken(user);
  }
  async register(data: AuthRegisterDTO) {
    const user = await this.UserService.create(data);

    return this.createToken(user);
  }

  async IsValidation(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (e) {
      return false;
    }
  }
}

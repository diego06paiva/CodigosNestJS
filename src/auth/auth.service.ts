import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { PrismaSerive } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly JWTservice: JwtService,
    private readonly prisma: PrismaSerive,
  ) {}

  async createToken() {
    //  return this.JWTservice.sign();
  }

  async checkToken() {
    // return this.JWTservice.verify();
  }

  async login(email: string, password: string) {
    const user = this.prisma.users.findFirst({
      where: {
        email,
        password,
      },
    });

    if (!user) {
      throw new UnauthorizedException(`Email ou senha incorretas`);
    }
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
    await this.prisma.users.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });
    return true;
  }
}

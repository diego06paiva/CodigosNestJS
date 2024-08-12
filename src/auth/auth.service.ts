import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { PrismaSerive } from 'src/prisma/prisma.service';
import { users } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'
import { MailerService } from '@nestjs-modules/mailer/dist';

@Injectable()
export class AuthService {
  constructor(
    private readonly JWTservice: JwtService,
    private readonly prisma: PrismaSerive,
    private readonly UserService: UserService,
    private readonly Mailer: MailerService
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
    const user = await this.prisma.users.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      throw new UnauthorizedException('Email invalido');
    }

    const token = this.JWTservice.sign({
      id: (await user).id
    }, {
      expiresIn: '7d',
      subject: String((await user).id),
      issuer: 'forget',
      audience: 'user'
    })

    await this.Mailer.sendMail({
      subject: "Recuperação de senha",
      to: "Diego@gmail.com",
      template: "forget",
      context: {
        name: (await user).name,
        token
      }
    })
    return true;
  }

  async reset(password: string, token: string) {
    
    try {
      const data:any = this.JWTservice.verify(token, {
        issuer: 'forget',
        audience: 'user',
      });
      if(isNaN(Number(data.id))){
        throw new BadRequestException('Token Invalido')
      }
      const salt = await bcrypt.genSalt()
      password = await bcrypt.hash(password, salt)
    const user = await this.prisma.users.update({
      where: {
        id: Number(data.id)
      },
      data: {
        password,
      },
    });
    return this.createToken(user);
    
    } catch (e) {
      console.log('token verificando erro:', e.message);
      throw new BadRequestException(e);
    }

    
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

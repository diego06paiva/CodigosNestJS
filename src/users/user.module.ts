import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule], //Modulos que este modulo importa
  controllers: [UserController], // Define qual controller ele deve usar neste módulo
  providers: [UserService],
  exports: [],
})
export class UserModule {} // Exportando meu UserModule para funcionar em outra parte do código

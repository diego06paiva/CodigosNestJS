import { Module } from '@nestjs/common';
import { UserController } from './user.controller';

@Module({
  imports: [], //Modulos que este modulo importa
  controllers: [UserController], // Define qual controller ele deve usar neste módulo
  providers: [],
  exports: [],
})
export class UserModule {} // Exportando meu UserModule para funcionar em outra parte do código

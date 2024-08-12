import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  setHello(): string {
    return 'Se você está vendo isso, é porque a rota correta não foi incluída. Para resolver, vá até o arquivo user.controller.ts e verifique se a rota correta está definida';
  }
}

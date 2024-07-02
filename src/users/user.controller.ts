import {
  // Aqui eu importo tudo que preciso para ele funcionar corretamente
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto'; //
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UserService } from './user.service';

@Controller('users') // Define a rota base do controller
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post() // Decorator post que usa o método post para pegar uma solicitação do usuario
  async create(@Body() data: CreateUserDTO) {
    // Parametros que eu peço para o usuario
    return this.userService.create(data); // O que eu quero que retorne quando ele passa os parametros pedidos
  }

  @Get() // Decorator Get que manda para o usuario
  async list() {
    return { users: [] }; // Aqui ele pega desde o id zero já que não foi passado nada
  }

  @Get(':id') // Decorator Get que manda o usuario para um lugar especifico quando ele põem um id especifico
  async show(@Param('id', ParseIntPipe) id) {
    // Aqui é para pegar os parametros do usuario e esse ParseIntPipe é para transformar o id em tipo int
    return { user: {}, id }; // Aqui ele retorna o id do usuario
  }

  @Put(':id') // Aqui pega o id do usuario para atualizar
  async update(
    @Body() { email, name, password }: UpdatePutUserDTO,
    // Esse UpdatePutUserDTO é de onde ele pega o DTO para o nome, email e senha já que nesse DTO
    //ele segue um padrão de como ele quer cada parametro
    @Param('id', ParseIntPipe) id,
  ) {
    return {
      method: 'put',
      email,
      name,
      password,
      id,
    };
  }

  @Patch(':id')
  async updatePartial(
    @Body() { name, email, password }: UpdatePatchUserDTO,
    @Param('id', ParseIntPipe) id,
  ) {
    return {
      method: 'Patch',
      name,
      email,
      password,
      id,
    };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id) {
    return {
      id,
    };
  }
}

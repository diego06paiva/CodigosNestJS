import {
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
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePatchUserDto } from './dto/update-patch-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';

@Controller('users')
export class UserController {
  @Post()
  async create(@Body() { email, name, password }: CreateUserDto) {
    return { email, name, password };
  }

  @Get()
  async read() {
    return { users: [] };
  }

  @Get(':id')
  async readOne(@Param('id', ParseIntPipe) id: number) {
    return { user: {}, id };
  }

  @Put(':id')
  async update(
    @Body() { email, name, password }: UpdateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return { method: 'Put', email, name, password, id };
  }

  @Patch(':id')
  async updatepartial(
    @Body() { email, name, password }: UpdatePatchUserDto,
    @Param() param,
  ) {
    return { method: 'Patch', email, name, password, param };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return { id };
  }
}

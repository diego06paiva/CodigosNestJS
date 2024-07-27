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
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePatchUserDto } from './dto/update-patch-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UserService } from './user.service';
import { LogInterceptor } from 'src/interceptors/log.interceptor';
import { ParamId } from 'src/decorators/param-id.decorators';

@UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly UserService: UserService) {}
  @Post()
  async create(@Body() data: CreateUserDto) {
    return this.UserService.create(data);
  }

  @Get()
  async list() {
    return this.UserService.list();
  }

  @Get(':id')
  async readOne(@ParamId() id: number) {
    return this.UserService.show(id);
  }

  @Put(':id')
  async update(
    @Body() data: UpdateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.UserService.update(id, data);
  }

  @Patch(':id')
  async updatepartial(
    @Body() data: UpdatePatchUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.UserService.updatePartial(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.UserService.delete(id);
  }
}

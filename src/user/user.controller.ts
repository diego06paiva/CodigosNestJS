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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePatchUserDto } from './dto/update-patch-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UserService } from './user.service';
import { LogInterceptor } from 'src/interceptors/log.interceptor';
import { ParamId } from 'src/decorators/param-id.decorators';
import { Role } from 'src/enum/role.enum';
import { Roles } from 'src/decorators/roles.decorators';
import { RoleGuards } from 'src/guards/role.guards';
import { AuthGuards } from 'src/guards/auth_guards';

//@UseGuards(AuthGuards,RoleGuards)
@UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Roles(Role.Admin, Role.User)
  @Post()
  async create(@Body() data: CreateUserDto) {
    return this.UserService.create(data);
  }

  @Roles(Role.Admin, Role.User)
  @Get()
  async list() {
    return this.UserService.list();
  }

  @Roles(Role.Admin)
  @Get(':id')
  async readOne(@ParamId() id: number) {
    return this.UserService.show(id);
  }

  @Roles(Role.Admin)
  @Put(':id')
  async update(
    @Body() data: UpdateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.UserService.update(id, data);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  async updatepartial(
    @Body() data: UpdatePatchUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.UserService.updatePartial(id, data);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.UserService.delete(id);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';

@Controller('users')
export class UserController {
  @Post()
  async create(@Body() body) {
    return { body };
  }

  @Get()
  async read() {
    return { users: [] };
  }

  @Get(':id')
  async readOne(@Param() param) {
    return { user: {}, param };
  }

  @Put(':id')
  async update(@Body() body, @Param() param) {
    return { method: 'Put', body, param };
  }

  @Patch(':id')
  async updatepartial(@Body() body, @Param() param) {
    return { method: 'Patch', body, param };
  }

  @Delete(':id')
  async delete(@Param() Param) {
    return { Param };
  }
}

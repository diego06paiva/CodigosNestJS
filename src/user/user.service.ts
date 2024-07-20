import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaSerive } from 'src/prisma/prisma.service';
import { UpdatePatchUserDto } from './dto/update-patch-user.dto';
import { error } from 'console';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaSerive) {}
  async create({ email, name, password }: CreateUserDto) {
    return this.prisma.users.create({
      data: { email, name, password },
    });
  }

  async list() {
    return this.prisma.users.findMany();
  }

  async show(id: number) {
    return this.prisma.users.findUnique({
      where: {
        id,
      },
    });
  }
  async update(id: number, data: UpdatePatchUserDto) {
    if (!(await this.show(id))) {
      throw new NotFoundException(`O id ${id} não foi encontrado`);
    }
    return this.prisma.users.update({
      data,
      where: {
        id,
      },
    });
  }

  async updatePartial(id: number, data: UpdatePatchUserDto) {
    if (!(await this.show(id))) {
      throw new NotFoundException(`O id ${id} não foi encontrado`);
    }
    return this.prisma.users.updateMany({
      data,
      where: {
        id,
      },
    });
  }

  async delete(id: number) {
    if (!(await this.show(id))) {
      throw new NotFoundException(`O id ${id} não foi encontrado`);
    }
    return this.prisma.users.delete({
      where: {
        id,
      },
    });
  }
}

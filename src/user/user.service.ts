import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaSerive } from 'src/prisma/prisma.service';
import { UpdatePatchUserDto } from './dto/update-patch-user.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
  constructor(private prisma: PrismaSerive) {}

  async create(data: CreateUserDto) {

    data.password = data.password

    const salt = await bcrypt.genSalt()
    
   data.password = await bcrypt.hash(data.password, salt)

    return this.prisma.users.create({
      data,
    });
  }

  async list() {
    return this.prisma.users.findMany();
  }

  async show(id: number) {
    if (
      !(await this.prisma.users.count({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException(`O id ${id} não foi encontrado`);
    }
    return this.prisma.users.findUnique({
      where: {
        id,
      },
    });
  }
  async update(id: number, {email, name, password, role}: UpdatePatchUserDto) {
    if (!(await this.show(id))) {
      throw new NotFoundException(`O id ${id} não foi encontrado`);
    }
    const salt = await bcrypt.genSalt()
    
   password = await bcrypt.hash(password, salt)

    return this.prisma.users.update({
      data: {email, name, password, role},
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

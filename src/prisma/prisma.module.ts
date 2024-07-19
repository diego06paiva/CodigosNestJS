import { Module } from '@nestjs/common';
import { PrismaSerive } from './prisma.service';

@Module({
  providers: [PrismaSerive],
  exports: [PrismaSerive],
})
export class PrismaModule {}

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [],
  imports: [
    JwtModule.register({
      secret: 'Jnw;8I&Huk-BS2<C+mqi.6kr2(d;23M',
    }),
    UserModule,
    PrismaModule,
  ],
  controllers: [AuthController],
})
export class AuthModule {}

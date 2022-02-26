import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomResponseService } from 'src/utils/custom-response/custom-response.service';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/users.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      privateKey: process.env.PRIVATE_KEY
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, CustomResponseService]
})
export class AuthModule {}

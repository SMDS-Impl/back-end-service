import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users.entity';
import { CustomResponseService } from 'src/utils/custome-response/custom-response.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
    }),
  ],
  providers: [UserService, CustomResponseService],
  controllers: [UserController]
})
export class UserModule {}

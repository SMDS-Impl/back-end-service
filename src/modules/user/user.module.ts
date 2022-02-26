import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users.entity';
import { CustomResponseService } from 'src/utils/custom-response/custom-response.service';
import { AdminMiddleware } from 'src/common/middlewares/admin-auth.middleware';

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
export class UserModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
     consumer.apply(AdminMiddleware).forRoutes(UserController);
  }
}

import {
    Body,
    Controller,
    HttpCode,
    Post,
    UsePipes,
    ValidationPipe,
  } from '@nestjs/common';
  import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
  import { ResponseEntity } from 'src/shared/dtos/response.dto';
  import { UserEntity } from '../user/users.entity';
  import { AuthService } from './auth.service';
  import { LoginDto } from './dtos/login-user.dto';
  
  @ApiTags('Auth')
  @Controller('auth')
  export class AuthController {
    constructor(private readonly authService: AuthService) {}
  
    /*
       @role login a use
       @param LoginDto
       @return User auth payload or authorized exception
       @endpoint /api/v1/user/login
      */
    @Post('/login')
    @HttpCode(200)
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiOkResponse({ type: UserEntity, description: 'User' })
    public async login(@Body() loginDto: LoginDto): Promise<ResponseEntity> {
      return await this.authService.login(loginDto);
    }
  }
  
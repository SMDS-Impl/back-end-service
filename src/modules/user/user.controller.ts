import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ResponseEntity } from 'src/shared/dtos/response.dto';
import { CreateUserDto } from './dtos/creat-user.dto';
import { UserService } from './user.service';
import { UserEntity } from './users.entity';

@Controller('users')
@ApiTags("Users")
export class UserController {
    constructor(
        private readonly userService: UserService
    ){}
    /*
     @role saves a new user
     @param CreateUserDto
     @return User
     @endpoint /api/v1/user
    */
    @Post('/')
    @HttpCode(201)
    @UsePipes(new ValidationPipe({transform: true}))
    @ApiOkResponse({type: UserEntity, description: "New user payload"})
    public async save(
        @Body() createUserDto: CreateUserDto
    ): Promise<ResponseEntity>{
        return await this.userService.save(createUserDto);
    }
}

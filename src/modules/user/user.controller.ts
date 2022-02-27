import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { ResponseEntity } from 'src/shared/dtos/response.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
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
    /*
    @role get all users
    @param N/A
    @return response entity with list of users
    @endpoint /api/v1/user/all
   */
    @Get('/all')
    @HttpCode(200)
    @ApiOkResponse({ type: UserEntity, description: 'List of Users' })
    public async getAll(
    ): Promise<ResponseEntity> {
        return await this.userService.findAll();
    }
    /*
    @role get one by id
    @param id
    @return User payload or not-found exception
    @endpoint /api/v1/user/id
   */
    @Get(':id')
    @HttpCode(200)
    @ApiParam({
        name: 'id',
        required: true,
        description: 'Get user by ID',
        schema: { oneOf: [{ type: 'string' }] },
    })
    @ApiOkResponse({ type: UserEntity, description: 'User' })
    public async getOneById(
        @Param('id') id: string
    ): Promise<ResponseEntity> {
        return await this.userService.getOne(id);
    }
    /*
    @role get all by role
    @param role
    @return User payload or bad-request exception
    @endpoint /api/v1/user/role/:role
   */
    @Get('/role/:role')
    @HttpCode(200)
    @ApiParam({
        name: 'role',
        required: true,
        description: 'Get all by role',
        schema: { oneOf: [{ type: 'enum' }] },
    })
    @ApiOkResponse({ type: UserEntity, description: 'list of users' })
    public async getByRole(
        @Param('role') role: string
    ): Promise<ResponseEntity> {
        return await this.userService.getByRole(role);
    }
    /*
    @role update one by id
    @param id
    @return updated User payload or not-found exception
    @endpoint /api/v1/user/id
   */
    @Put(':id')
    @HttpCode(200)
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiBearerAuth('token')
    @ApiParam({
        name: 'id',
        required: true,
        description: 'Update user by ID',
        schema: { oneOf: [{ type: 'string' }] },
    })
    @ApiOkResponse({ type: UserEntity, description: 'Updated user payload' })
    public async update(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<ResponseEntity> {
        return await this.userService.update(id, updateUserDto);
    }
    /*
    @role update one by id
    @param id
    @return deleted User payload or not-found exception
    @endpoint /api/v1/user/id
   */
    @Delete(':id')
    @HttpCode(200)
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiParam({
        name: 'id',
        required: true,
        description: 'Delete user by ID',
        schema: { oneOf: [{ type: 'string' }] },
    })
    @ApiOkResponse({ type: UserEntity, description: 'Deleted user payload' })
    public async delete(
        @Param('id') id: string,
    ): Promise<ResponseEntity> {
        return await this.userService.delete(id);
    }
}

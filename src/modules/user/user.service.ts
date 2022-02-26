import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EUserRole } from 'src/enums/EUserRole';
import { hashPassword } from 'src/helpers/hash';
import { ResponseEntity } from 'src/shared/dtos/response.dto';
import { EResponseType } from 'src/shared/enums/EResponseType';
import { CustomResponseService } from 'src/utils/custom-response/custom-response.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/creat-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserEntity } from './users.entity';

const { SUCCESS } = EResponseType;
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly responseService: CustomResponseService,
    ) { }
    /*
     @role saves a new user
     @param CreateUserDto
     @return User
    */
    public async save(createUserDto: CreateUserDto): Promise<ResponseEntity> {
        const { email, password } = createUserDto;
        const existsByEmail: UserEntity | false = await this._findOneByEmail(email);
        if (existsByEmail) throw new HttpException(`User with email [${email}] already used`, HttpStatus.BAD_REQUEST);
        createUserDto.password = await hashPassword(password);
        const user = await this.userRepository.save(createUserDto);
        delete user.password;
        const response: ResponseEntity = this.responseService.makeResponse(
            "Successfully registered user",
            201,
            user,
            SUCCESS
        );
        return response;
    }
    /*
    @role get one user by id
    @param user id
    @return response entity with user payload or Not-found exception 
   */
    public async getOne(id: string) : Promise<ResponseEntity> {
      const user = await this._findOneById(id);
      if(!user) throw new HttpException(`User with id [${id}] not found`, HttpStatus.NOT_FOUND);
      const response: ResponseEntity = await this.responseService.makeResponse(
          "Successfully fetched user",
          200,
          user,
          SUCCESS
      );
      return response;
    }
    /*
    @role get all by role
    @param role
    @return response entity with user payload or Not-found exception 
   */
    public async getByRole(role: string) : Promise<ResponseEntity> {
      if(role != EUserRole.ADMIN && role!= EUserRole.SCHOOL_ACCOUNTANT) throw new HttpException("Invalid role", HttpStatus.BAD_REQUEST)
      const users: Array<UserEntity> = await this.userRepository.find({where: {role}})
      const response: ResponseEntity = await this.responseService.makeResponse(
          `Successfully fetched users with role ${role}`,
          200,
          users,
          SUCCESS
      );
      return response;
    }
    /*
    @role update user
    @param user id, update dto
    @return response payload with updated user payload or not-found exception or failed-dependency exception 
   */
    public async update(id: string, updateUserDto: UpdateUserDto) : Promise<ResponseEntity> {
        const user = await this._findOneById(id);
        if(!user) throw new HttpException(`User with id [${id}] not found`, HttpStatus.NOT_FOUND);
        let newUser;
        try{
            newUser = await this.userRepository.update(id, updateUserDto);
        }
        catch(e){
            throw new HttpException("Failed to update user", HttpStatus.FAILED_DEPENDENCY);
        }
        const response: ResponseEntity = await this.responseService.makeResponse(
            "Successfully updated user",
            200,
            newUser,
            SUCCESS
        );
        return response;
      }
    /*
    @role delete user
    @param user id
    @return response entity with deleted user payload or not found exception
   */
    public async delete(id: string) : Promise<ResponseEntity> {
        const user = await this._findOneById(id);
        if(!user) throw new HttpException(`User with id [${id}] not found`, HttpStatus.NOT_FOUND);
        try{
            await this.userRepository.delete(id);
        }
        catch(e){
            throw new HttpException("Failed to update user", HttpStatus.FAILED_DEPENDENCY);
        }
        const response: ResponseEntity = await this.responseService.makeResponse(
            "Successfully deleted user",
            200,
            user,
            SUCCESS
        );
        return response;
      }
    /*
    @role find all users
    @param N/A
    @return response entity with list of users
   */
    public async findAll(): Promise<ResponseEntity>{
        const users: Array<UserEntity> = await this.userRepository.find();
        const response: ResponseEntity = this.responseService.makeResponse(
            "Successfully fetched users",
            200,
            users,
            SUCCESS
        );
        return response;
    }
    public async _findOneByEmail(email: string): Promise<UserEntity | false> {
        try {
            const user: UserEntity = await this.userRepository.findOne({ where: { email } });
            if (user) return user;
            return false;
        }
        catch (e) {
            return false;
        }
    }
    /*
    @role search one by id
    @param user id
    @return user  if found, else returns false
    */
    public async _findOneById(id: string): Promise<UserEntity | false> {
        try {
            const user: UserEntity = await this.userRepository.findOne({ where: { id } });
            if (user) return user;
            return false
        }
        catch (e) {
            return false;
        }
    }
     /*
     @role return user with password
     @param email
     @return user  if found, else returns false
    */
     public async _findAuthUserWithEmail(email: string): Promise<UserEntity | false> {
        try {
            const user: UserEntity = await this.userRepository.createQueryBuilder('users').addSelect('users.password')
                .where("users.email = :email", { email })
                .getOne();
            if (user) return user;
            return false;
        }
        catch (e) {
            return false;
        }
    }
}

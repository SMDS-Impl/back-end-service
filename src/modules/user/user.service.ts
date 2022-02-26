import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPassword } from 'src/helpers/hash';
import { ResponseEntity } from 'src/shared/dtos/response.dto';
import { EResponseType } from 'src/shared/enums/EResponseType';
import { CustomResponseService } from 'src/utils/custome-response/custom-response.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserEntity } from './users.entity';

const {SUCCESS} = EResponseType;
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly responseService: CustomResponseService
    ){}
    /*
     @role saves a new user
     @param CreateUserDto
     @return User
    */
    public async save(createUserDto: CreateUserDto) : Promise<ResponseEntity> {
        const {email, password} = createUserDto;
        const existsByEmail: UserEntity | false = await this._findOneByEmail(email);
        if(existsByEmail) throw new HttpException(`User with email [${email}] already used`, HttpStatus.BAD_REQUEST);
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
     @role finds by email
     @param email
     @return User or false for not found
    */
    private async _findOneByEmail(email: string): Promise<UserEntity | false>{
      try{
        const user: UserEntity = await this.userRepository.findOne({where: {email}});
        if(user) return user;
        return false;
      }
      catch(e){
          return false;
      }
    }
}

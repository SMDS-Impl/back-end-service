import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { verifyPassword } from 'src/helpers/hash';
import { ResponseEntity } from 'src/shared/dtos/response.dto';
import { EResponseType } from 'src/shared/enums/EResponseType';
import { CustomResponseService } from 'src/utils/custom-response/custom-response.service';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/users.entity';
import { LoginDto } from './dtos/login-user.dto';

const { SUCCESS } = EResponseType;

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly responseService: CustomResponseService,
    private readonly jwtService: JwtService
  ) {}

  /*
     @role login a user
     @param Login Dto
     @return Auth data
    */
  public async login(loginDto: LoginDto): Promise<ResponseEntity> {
    const { email, password } = loginDto;
    const user: UserEntity | false = await this.userService._findAuthUserWithEmail(email);
    if (!user)
      throw new HttpException(
        `Invalid email number or password`,
        HttpStatus.UNAUTHORIZED,
      );
    const isPasswordValid: boolean = await verifyPassword(
      user.password,
      password,
    );
    if (!isPasswordValid)
      throw new HttpException(
        `Invalid email number or password`,
        HttpStatus.UNAUTHORIZED,
      );
    const payload = await this._signToken(user);
    if (!payload)
      throw new HttpException(
        'Failed to assign token',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    const response: ResponseEntity = this.responseService.makeResponse(
      'Successfully logged in',
      200,
      {
        user: payload.data,
        access_token: payload.access_token,
      },
      SUCCESS,
    );
    return response;
  }
    /*
    @role signs jwt token
    @param user payload
    @return jwt token && payload
   */
    public async _signToken(payload: UserEntity) {
        try {
            delete payload.password;
            const access_token = await this.jwtService.sign(JSON.stringify(payload));
            return { data: payload, access_token }
        }
        catch (e) {
            return false;
        }
    }
}

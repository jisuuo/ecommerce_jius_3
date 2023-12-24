import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService) {}

  // 회원가입 api
  async creatUser(createUserDto: CreateUserDto) {
    return await this.userService.creatUser(createUserDto);
  }

  // 로그인 api
  async loginUSer(loginUserDto: LoginUserDto){
    // email로 유저 db에서 찾은 후
    const user = await this.userService.getUserByEmail(loginUserDto.email);
    // 패스워드 매칭
    // const isMatched = await bcrypt.compare(loginUserDto.password, user.password);
    const isMatched =await user.checkPassword(loginUserDto.password);
    if(!isMatched) {
      throw new HttpException('Not Matched', HttpStatus.NOT_FOUND);
    }
    return user;
  }
}

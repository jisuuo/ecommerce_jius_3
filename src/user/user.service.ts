import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { use } from 'passport';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    public userRepo : Repository<User>,
  ) {}

  // 회원가입 api
  async creatUser(createUserDto : CreateUserDto) {
    const newUser = await this.userRepo.create(createUserDto);
    await this.userRepo.save(newUser);
    return newUser;
  }

  // 이메일 유저정보 확인
  async getUserByEmail(email: string) {
    const user = await this.userRepo.findOneBy({email});
    if(user) return user;
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }

  async getUserById(userId: string) {
    const user= await this.userRepo.findOneBy({id: userId});
    if(user) return user;
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }
}

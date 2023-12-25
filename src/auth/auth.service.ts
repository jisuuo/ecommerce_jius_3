import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JwtUserInterface } from '../interfaces/jwtUser.interface';
import { ConfigService } from '@nestjs/config';
import { EmailModule } from '../email/email.module';
import { EmailService } from '../email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly emailService: EmailService,
  ) {}

  // 회원가입 api
  async creatUser(createUserDto: CreateUserDto) {
    return await this.userService.creatUser(createUserDto);
  }

  // 로그인 api
  async loginUSer(loginUserDto: LoginUserDto) {
    // email로 유저 db에서 찾은 후
    const user = await this.userService.getUserByEmail(loginUserDto.email);
    // 패스워드 매칭
    // const isMatched = await bcrypt.compare(loginUserDto.password, user.password);
    const isMatched = await user.checkPassword(loginUserDto.password);
    if (!isMatched) {
      throw new HttpException('Not Matched', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async getCookieByToken(userId: string) {
    const payload: JwtUserInterface = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
    });
    return token;
  }

  async sendEmail(email: string) {
    const number = this.generate();
    await this.emailService.sendMail({
      to: email,
      subject: '이메일 인증',
      text: `이메일을 인증해주세요 ${number}`,
    });
    return 'Please Check Your Email';
  }

  generate() {
    let OTP = '';
    for (let i = 0; i <= 6; i++) {
      OTP += Math.floor(Math.random() * 10);
    }
    return OTP;
  }
}

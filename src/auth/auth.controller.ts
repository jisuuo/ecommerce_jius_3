import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { LocalUserGuard } from '../guards/local-user.guard';
import { RequestUser } from '../interfaces/requestUser.interface';
import { JwtService } from '@nestjs/jwt';
import { JwtUserGuard } from '../guards/jwt-user.guard';


@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService) {}

  // 회원가입 api
  @Post('signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.authService.creatUser(createUserDto);
  }

  // 로그인 api
  @Post('login')
  @UseGuards(LocalUserGuard)
  async loginUser(@Req() req: RequestUser) {
    const user = req.user;
    const token = await this.authService.getCookieByToken(user.id);
    if(!token) throw new HttpException('Not Token', HttpStatus.BAD_REQUEST);
    return {
      user,
      token,
    }
  }

  @Get()
  @UseGuards(JwtUserGuard)
  async getUserInfoByToken(@Req() requestUser: RequestUser) {
    return requestUser.user;
  }
}

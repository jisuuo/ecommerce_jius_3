import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { LocalUserGuard } from '../guards/local-user.guard';
import { RequestUser } from '../interfaces/requestUser.interface';


@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 회원가입 api
  @Post('signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.authService.creatUser(createUserDto);
  }

  // 로그인 api
  @Post('login')
  @UseGuards(LocalUserGuard)
  async loginUser(@Req() req: RequestUser) {
    return req.user;
  }
}

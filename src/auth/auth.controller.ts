import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';


@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.authService.creatUser(createUserDto);
  }

}

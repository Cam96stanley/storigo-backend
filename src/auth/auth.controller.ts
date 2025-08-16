import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto, LoginDto } from 'src/auth/dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: AuthService) {}
  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    return { success: true, user };
  }

  @Post('login')
  async login(@Body() login: LoginDto) {
    const user = await this.userService.login(login);
    return { success: true, user };
  }
}

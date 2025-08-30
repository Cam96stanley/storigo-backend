import {
  Body,
  Controller,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto, LoginDto } from 'src/auth/dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.createUser(createUserDto);
    return { success: true, user };
  }

  @Post('login')
  async login(
    @Body() data: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.validateUser(data);

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const token = await this.authService.generateToken(user.id, user.username);

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'development',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60,
    });

    return {
      message: 'Login successful',
      user: { id: user.id, email: user.email, username: user.username },
    };
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    return { message: 'Logged out successfully' };
  }
}

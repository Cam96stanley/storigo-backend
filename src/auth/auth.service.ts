import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, LoginDto } from 'src/auth/dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async createUser(data: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);

      const user = await this.prisma.user.create({
        data: {
          email: data.email,
          username: data.username,
          passwordHash: hashedPassword,
        },
      });

      return user;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException(
          'User with this email or username already exists',
        );
      }
      throw error;
    }
  }

  async validateUser(data: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const passwordMatches = await bcrypt.compare(
      data.password,
      user.passwordHash,
    );
    if (!passwordMatches)
      throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  async generateToken(userId: number, username: string) {
    const payload = { sub: userId, username };
    return this.jwtService.sign(payload);
  }
}

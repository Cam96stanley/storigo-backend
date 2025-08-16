import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(20)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  passwordHash: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  bio?: string;

  @IsString()
  @IsOptional()
  profileImageUrl?: string;
}

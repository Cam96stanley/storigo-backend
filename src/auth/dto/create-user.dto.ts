import { IsEmail, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(20)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

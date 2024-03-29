import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserUpdateDto {
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;
}

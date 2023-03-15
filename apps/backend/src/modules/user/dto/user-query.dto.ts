import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserQueryDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  email?: string;
}

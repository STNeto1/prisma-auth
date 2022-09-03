import { IsEmail, IsOptional, IsString } from 'class-validator'

export class UpdateUserDto {
  @IsString()
  name: string

  @IsString()
  @IsEmail()
  email: string

  @IsOptional()
  password?: string
}

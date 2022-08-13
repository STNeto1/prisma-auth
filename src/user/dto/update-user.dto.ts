import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsOptional, IsString } from 'class-validator'

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string

  @ApiProperty({ nullable: true })
  @IsOptional()
  password?: string
}

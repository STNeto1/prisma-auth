import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common'
import { Response } from 'express'
import { CreateUserDto } from '../user/dto/create-user.dto'
import { UserEntity } from '../user/entities/user.entity'
import { AuthService } from './auth.service'
import { CurrentUser } from './decorators/current-user.decorator'
import { LoginDto } from './dto/login.dto'
import { JwtAuthGuard } from './guard/jwt-guard'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() data: LoginDto, @Res() response: Response) {
    const cookie = await this.authService.validateUser(data)

    response.setHeader('Set-Cookie', cookie)
    return response.status(204).send()
  }

  @Post('register')
  async register(@Body() data: CreateUserDto, @Res() response: Response) {
    const cookie = await this.authService.createUser(data)

    response.header('Set-Cookie', cookie)
    return response.status(204).send()
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@CurrentUser() user: UserEntity): Promise<UserEntity> {
    return user
  }
}

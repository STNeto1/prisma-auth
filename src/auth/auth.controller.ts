import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiTags
} from '@nestjs/swagger'
import type { FastifyReply } from 'fastify'
import { CreateUserDto } from '../user/dto/create-user.dto'
import { UserEntity } from '../user/entities/user.entity'
import { AuthService } from './auth.service'
import { CurrentUser } from './decorators/current-user.decorator'
import { LoginDto } from './dto/login.dto'
import { JwtAuthGuard } from './guard/jwt-guard'

@ApiTags('api/auth')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiNoContentResponse()
  @ApiBadRequestResponse({
    description: 'Invalid credentials'
  })
  async login(@Body() data: LoginDto, @Res() reply: FastifyReply) {
    const cookie = await this.authService.validateUser(data)

    reply.header('Set-Cookie', cookie)
    return reply.status(204).send()
  }

  @Post('register')
  @ApiNoContentResponse()
  @ApiBadRequestResponse({
    description: 'Bad request'
  })
  async register(@Body() data: CreateUserDto, @Res() reply: FastifyReply) {
    const cookie = await this.authService.createUser(data)

    reply.header('Set-Cookie', cookie)
    return reply.status(204).send()
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  async profile(@CurrentUser() user: UserEntity): Promise<UserEntity> {
    return user
  }
}

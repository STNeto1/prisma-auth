import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiTags
} from '@nestjs/swagger'
import { CreateUserDto } from '../user/dto/create-user.dto'
import { UserEntity } from '../user/entities/user.entity'
import { AuthService } from './auth.service'
import { CurrentUser } from './decorators/current-user.decorator'
import { LoginDto } from './dto/login.dto'
import { JwtAuthGuard } from './guard/jwt-guard'
import { JwtReturn } from './types/jwt'

@ApiTags('api/auth')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiCreatedResponse({
    description: 'Auth token',
    type: JwtReturn
  })
  @ApiBadRequestResponse({
    description: 'Invalid credentials'
  })
  async login(@Body() data: LoginDto): Promise<JwtReturn> {
    return this.authService.validateUser(data)
  }

  @Post('register')
  @ApiCreatedResponse({
    description: 'Auth token',
    type: JwtReturn
  })
  @ApiBadRequestResponse({
    description: 'Bad request'
  })
  async register(@Body() data: CreateUserDto): Promise<JwtReturn> {
    return this.authService.createUser(data)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  async profile(@CurrentUser() user: UserEntity): Promise<UserEntity> {
    return user
  }
}

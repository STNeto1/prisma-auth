import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { JwtAuthGuard } from './guard/jwt-guard'
import { JwtReturn } from './types/jwt'

@ApiTags('api/auth')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() data: LoginDto): Promise<JwtReturn> {
    return this.authService.validateUser(data)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  async profile(@Req() req): Promise<JwtReturn> {
    return req.user
  }
}

import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto } from '../user/dto/create-user.dto'
import { UserEntity } from '../user/entities/user.entity'
import { UserService } from '../user/user.service'
import { LoginDto } from './dto/login.dto'
import { JwtReturn } from './types/jwt'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  async validateUser(data: LoginDto): Promise<JwtReturn> {
    const user = await this.userService.validate(data)

    return this.generateToken(user)
  }

  async createUser(data: CreateUserDto): Promise<JwtReturn> {
    const user = await this.userService.create(data)

    return this.generateToken(user)
  }

  generateToken(user: UserEntity): JwtReturn {
    const payload = {
      sub: user.id
    }

    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}

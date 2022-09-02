import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto } from '../user/dto/create-user.dto'
import { UserEntity } from '../user/entities/user.entity'
import { UserService } from '../user/user.service'
import { LoginDto } from './dto/login.dto'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  async validateUser(data: LoginDto) {
    const user = await this.userService.validate(data)

    return this.generateToken(user)
  }

  async createUser(data: CreateUserDto) {
    const user = await this.userService.create(data)

    return this.generateToken(user)
  }

  generateToken(user: UserEntity) {
    const payload = {
      sub: user.id
    }

    const token = this.jwtService.sign(payload)

    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24}s`
  }
}

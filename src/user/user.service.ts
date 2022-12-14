import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { User } from '@prisma/client'
import * as argon2 from 'argon2'
import { LoginInput } from '../auth/input/login.input'
import { RegisterInput } from '../auth/input/register.input'

import { PrismaService } from '../prisma/prisma.service'
import { UserEntity } from './entities/user.entity'
import { UpdateUserInput } from './input/update-user.input'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: RegisterInput): Promise<UserEntity> {
    await this.checkEmailUsage(createUserDto.email)

    return this.prisma.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: await argon2.hash(createUserDto.password)
      }
    })
  }

  async findAll(): Promise<Array<UserEntity>> {
    return this.prisma.user.findMany({})
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({
      where: { id }
    })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    return user
  }

  async validate(data: LoginInput): Promise<UserEntity> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: data.email
      }
    })

    if (!user) {
      throw new BadRequestException('Invalid credentials')
    }

    const isValid = await argon2.verify(user.password, data.password)

    if (!isValid) {
      throw new BadRequestException('Invalid credentials')
    }

    return user
  }

  async update(
    id: string,
    updateUserDto: UpdateUserInput
  ): Promise<UserEntity> {
    const user = (await this.findOne(id)) as User

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      await this.checkEmailUsage(updateUserDto.email)
    }

    return this.prisma.user.update({
      where: { id },
      data: {
        name: updateUserDto.name,
        email: updateUserDto.email,
        password: updateUserDto.password
          ? await argon2.hash(updateUserDto.password)
          : user.password
      }
    })
  }

  async checkEmailUsage(email: string): Promise<void> {
    const user = await this.prisma.user.findFirst({
      where: {
        email
      }
    })

    if (user) {
      throw new BadRequestException('Email already in use')
    }
  }
}

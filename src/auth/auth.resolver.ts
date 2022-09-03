import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Request } from 'express'
import { UserEntity } from '../user/entities/user.entity'
import { AuthService } from './auth.service'
import { CurrentUser } from './decorators/current-user.decorator'
import { JwtAuthGuard } from './guard/jwt-guard'
import { LoginInput } from './input/login.input'
import { RegisterInput } from './input/register.input'

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => Boolean)
  async login(@Args('input') data: LoginInput, @Context() context: Request) {
    const cookie = await this.authService.validateUser(data)

    context.res?.header('Set-Cookie', cookie)
    return true
  }

  @Mutation(() => Boolean)
  async register(
    @Args('input') data: RegisterInput,
    @Context() context: Request
  ) {
    const cookie = await this.authService.createUser(data)
    context.res?.header('Set-Cookie', cookie)
    return true
  }

  @Query(() => UserEntity)
  @UseGuards(JwtAuthGuard)
  profile(@CurrentUser() user: UserEntity) {
    return user
  }
}

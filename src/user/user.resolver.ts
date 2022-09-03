import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserEntity } from './entities/user.entity'
import { UpdateUserInput } from './input/update-user.input'
import { UserService } from './user.service'

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserEntity], {
    name: 'findAllUsers'
  })
  async findAll(): Promise<Array<UserEntity>> {
    return this.userService.findAll()
  }

  @Query(() => UserEntity, {
    name: 'findOneUser'
  })
  async findOne(@Args('id') id: string): Promise<UserEntity> {
    return this.userService.findOne(id)
  }

  @Mutation(() => UserEntity, {
    name: 'updateUser'
  })
  async update(@Args('input') data: UpdateUserInput): Promise<UserEntity> {
    return this.userService.update(data.id, data)
  }
}

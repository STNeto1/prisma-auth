import { Body, Controller, Get, Param, Patch } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags
} from '@nestjs/swagger'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserEntity } from './entities/user.entity'
import { UserService } from './user.service'

@ApiTags('api/users')
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOkResponse({ description: 'All users', type: [UserEntity] })
  async findAll(): Promise<Array<UserEntity>> {
    return this.userService.findAll()
  }

  @Get(':id')
  @ApiOkResponse({ description: 'User from id', type: UserEntity })
  @ApiNotFoundResponse({ description: 'User not found' })
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    return this.userService.findOne(id)
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'User updated', type: UserEntity })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'Email in use.' })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<UserEntity> {
    return this.userService.update(id, updateUserDto)
  }
}

import { Body, Controller, Get, Param, Patch } from '@nestjs/common'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserEntity } from './entities/user.entity'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<Array<UserEntity>> {
    return this.userService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    return this.userService.findOne(id)
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<UserEntity> {
    return this.userService.update(id, updateUserDto)
  }
}

import { ApiHideProperty, ApiProperty } from '@nestjs/swagger'
import { User } from '@prisma/client'

export class UserEntity implements Partial<User> {
  @ApiProperty({ type: 'string' })
  id: string

  @ApiProperty({ type: 'string' })
  name: string

  @ApiProperty({ type: 'string' })
  email: string

  @ApiHideProperty()
  password?: string = ''

  @ApiProperty({ type: 'string' })
  createdAt: Date

  @ApiProperty({ type: 'string' })
  updatedAt: Date
}

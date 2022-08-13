import { ApiHideProperty, ApiProperty } from '@nestjs/swagger'
import { User } from '@prisma/client'

export class UserEntity implements User {
  @ApiProperty({ type: 'string' })
  id: string

  @ApiProperty({ type: 'string' })
  name: string

  @ApiProperty({ type: 'string' })
  email: string

  @ApiHideProperty()
  password: string

  @ApiProperty({ type: 'date' })
  createdAt: Date

  @ApiProperty({ type: 'date' })
  updatedAt: Date
}

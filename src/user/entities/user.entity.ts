import { Field, HideField, ID, ObjectType } from '@nestjs/graphql'
import { User } from '@prisma/client'

@ObjectType()
export class UserEntity implements User {
  @Field(() => ID)
  id: string

  @Field(() => String)
  name: string

  @Field(() => String)
  email: string

  @HideField()
  password: string

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date)
  updatedAt: Date
}

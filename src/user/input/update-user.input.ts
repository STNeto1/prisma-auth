import { Field, ID, InputType } from '@nestjs/graphql'
import { IsEmail, IsOptional, IsString } from 'class-validator'

@InputType()
export class UpdateUserInput {
  @Field(() => ID)
  @IsString()
  id: string

  @Field(() => String)
  @IsString()
  name: string

  @Field(() => String)
  @IsString()
  @IsEmail()
  email: string

  @Field(() => String, { nullable: true })
  @IsOptional()
  password?: string
}

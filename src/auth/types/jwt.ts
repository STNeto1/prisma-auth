import { ApiProperty } from '@nestjs/swagger'

export type JwtPayload = {
  sub: string
}

export class JwtReturn {
  @ApiProperty()
  access_token: string
}

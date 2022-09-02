import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { FastifyRequest } from 'fastify'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { UserEntity } from '../../user/entities/user.entity'
import { UserService } from '../../user/user.service'
import { getRsaPublicKey } from '../../utils'
import { JwtPayload } from '../types/jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: FastifyRequest) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return request?.cookies?.Authentication
        }
      ]),
      ignoreExpiration: false,
      secretOrKey: getRsaPublicKey()
    })
  }

  async validate(payload: JwtPayload): Promise<UserEntity> {
    return this.userService.findOne(payload.sub)
  }
}

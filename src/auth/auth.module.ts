import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { UserModule } from '../user/user.module'
import { getRsaPrivateKey } from '../utils'

import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategy/jwt.strategy'

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: getRsaPrivateKey(),
      signOptions: {
        expiresIn: '1h',
        algorithm: 'RS256'
      }
    })
  ],
  providers: [AuthResolver, AuthService, JwtStrategy],
  controllers: []
})
export class AuthModule {}

import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { PrismaModule } from './prisma/prisma.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [UserModule, PrismaModule, AuthModule],
  controllers: [],
  providers: []
})
export class AppModule {}

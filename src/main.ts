import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify'

import { AppModule } from './app.module'
import { PrismaService } from './prisma/prisma.service'

declare const module: any

async function bootstrap() {
  const fastify = new FastifyAdapter({
    logger: true
  })
  // fastify.register(cookie, {} as FastifyCookieOptions)

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastify
  )

  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(3000, '0.0.0.0')

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}
bootstrap()

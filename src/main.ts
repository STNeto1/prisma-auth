import type { FastifyCookieOptions } from '@fastify/cookie'
import cookie from '@fastify/cookie'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'
import { PrismaService } from './prisma/prisma.service'

declare const module: any

async function bootstrap() {
  const fastify = new FastifyAdapter({
    logger: true
  })
  fastify.register(cookie, {} as FastifyCookieOptions)

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastify
  )

  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)

  app.useGlobalPipes(new ValidationPipe())

  const config = new DocumentBuilder()
    .setTitle('Docs')
    .setDescription('Description')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  await app.listen(3000, '0.0.0.0')

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}
bootstrap()

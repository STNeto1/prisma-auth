import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'
import { PrismaService } from './prisma/prisma.service'

async function bootstrap() {
  const fastify = new FastifyAdapter({
    logger: true
  })
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
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  await app.listen(3000, '0.0.0.0')
}
bootstrap()

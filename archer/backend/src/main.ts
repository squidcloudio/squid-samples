import { NestFactory } from '@nestjs/core';
import { BodyInterceptor, LocalBackendModule } from './local-backend.module';
import { truthy } from '@squidcloud/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(LocalBackendModule, {
    rawBody: true,
  });
  app.useBodyParser('json', { limit: '50mb' });
  app.useGlobalInterceptors(truthy(app.get(BodyInterceptor)));

  await app.listen(8020);
  console.log('Backend code is running on port 8020');
}

bootstrap().then();

import { NestFactory } from '@nestjs/core';
import { BodyInterceptor, LocalBackendModule } from './local-backend.module';
import { truthy } from '@squidcloud/common';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(LocalBackendModule, {
    rawBody: true,
  });
  app.useGlobalInterceptors(truthy(app.get(BodyInterceptor)));

  await app.listen(8020);
  console.log('Backend code is running on port 8020');
}

bootstrap().then();

import { CallHandler, ExecutionContext, Injectable, Module, NestInterceptor } from '@nestjs/common';
import { LocalBackendController } from './local-backend.controller';
import { LocalBackendService } from './local-backend.service';
import { Observable } from 'rxjs';
import { deserializeObj } from '@squidcloud/common';

@Injectable()
export class BodyInterceptor implements NestInterceptor {
  async intercept(ctx: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    if (ctx.getType() !== 'http') return next.handle();
    const httpRequest = ctx.switchToHttp().getRequest();
    httpRequest.body = httpRequest.rawBody ? deserializeObj(httpRequest.rawBody.toString()) : {};
    return next.handle();
  }
}
@Module({
  imports: [],
  controllers: [LocalBackendController],
  providers: [LocalBackendService, BodyInterceptor],
})
export class LocalBackendModule {}

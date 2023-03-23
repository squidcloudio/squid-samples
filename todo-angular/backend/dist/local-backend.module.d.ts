import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class BodyInterceptor implements NestInterceptor {
    intercept(ctx: ExecutionContext, next: CallHandler): Promise<Observable<any>>;
}
export declare class LocalBackendModule {
}

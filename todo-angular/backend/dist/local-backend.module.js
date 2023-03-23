"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalBackendModule = exports.BodyInterceptor = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const local_backend_controller_1 = require("./local-backend.controller");
const local_backend_service_1 = require("./local-backend.service");
const common_2 = require("@squidcloud/common");
let BodyInterceptor = class BodyInterceptor {
    async intercept(ctx, next) {
        if (ctx.getType() !== 'http')
            return next.handle();
        const httpRequest = ctx.switchToHttp().getRequest();
        httpRequest.body = httpRequest.rawBody ? (0, common_2.deserializeObj)(httpRequest.rawBody.toString()) : {};
        return next.handle();
    }
};
BodyInterceptor = tslib_1.__decorate([
    (0, common_1.Injectable)()
], BodyInterceptor);
exports.BodyInterceptor = BodyInterceptor;
let LocalBackendModule = class LocalBackendModule {
};
LocalBackendModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [local_backend_controller_1.LocalBackendController],
        providers: [local_backend_service_1.LocalBackendService, BodyInterceptor],
    })
], LocalBackendModule);
exports.LocalBackendModule = LocalBackendModule;
//# sourceMappingURL=local-backend.module.js.map
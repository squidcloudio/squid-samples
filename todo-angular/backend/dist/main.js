"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const local_backend_module_1 = require("./local-backend.module");
const common_1 = require("@squidcloud/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(local_backend_module_1.LocalBackendModule, {
        rawBody: true,
    });
    app.useGlobalInterceptors((0, common_1.truthy)(app.get(local_backend_module_1.BodyInterceptor)));
    await app.listen(8020);
    console.log('Backend code is running on port 8020');
}
bootstrap().then();
//# sourceMappingURL=main.js.map
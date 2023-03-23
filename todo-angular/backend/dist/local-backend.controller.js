"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalBackendController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const local_backend_service_1 = require("./local-backend.service");
const common_2 = require("@squidcloud/common");
let LocalBackendController = class LocalBackendController {
    constructor(localBackendService) {
        this.localBackendService = localBackendService;
    }
    async runCode(request, res) {
        try {
            const processResult = await this.localBackendService.processRunCode(request);
            res.set('Content-Type', 'application/json').status(200).send((0, common_2.serializeObj)(processResult));
        }
        catch (e) {
            res
                .set('Content-Type', 'application/json')
                .status(500)
                .send((0, common_2.serializeObj)({ ok: false, error: e.message }));
        }
    }
    async healthCheck(res) {
        console.log('Got health check request');
        res.status(200).send('OK');
    }
};
tslib_1.__decorate([
    (0, common_1.Post)('run'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LocalBackendController.prototype, "runCode", null);
tslib_1.__decorate([
    (0, common_1.Get)('health'),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LocalBackendController.prototype, "healthCheck", null);
LocalBackendController = tslib_1.__decorate([
    (0, common_1.Controller)('code'),
    tslib_1.__metadata("design:paramtypes", [local_backend_service_1.LocalBackendService])
], LocalBackendController);
exports.LocalBackendController = LocalBackendController;
//# sourceMappingURL=local-backend.controller.js.map
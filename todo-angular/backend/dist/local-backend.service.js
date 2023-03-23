"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalBackendService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const BackendService = tslib_1.__importStar(require("./index"));
const common_2 = require("@squidcloud/common");
let LocalBackendService = class LocalBackendService {
    async executeActionRequest(actionRequest) {
        const { action } = actionRequest;
        if (action !== 'executeFunction') {
            console.error('UNSUPPORTED ACTION!!! ', action);
            return { ok: false, error: 'INVALID_ACTION' };
        }
        const payload = actionRequest.payload;
        const [serviceName, fnName] = payload.functionName.split(':');
        let fn;
        if (serviceName === 'default') {
            fn = BackendService[serviceName][fnName];
        }
        else {
            const Service = BackendService[serviceName];
            const service = new Service({
                secrets: payload.secrets,
                context: payload.context,
                auth: payload.auth,
                backendApiKey: payload.backendApiKey,
            });
            fn = service[fnName].bind(service);
        }
        if (!fn) {
            return { ok: false, error: 'FUNCTION_NOT_FOUND' };
        }
        try {
            const transformedParams = (0, common_2.transformParams)(payload.params, payload.executeFunctionAnnotationType);
            const functionResponse = await fn(...transformedParams);
            const transformedResponse = (0, common_2.transformResponse)(functionResponse, payload.executeFunctionAnnotationType);
            return { ok: true, functionResponse: transformedResponse };
        }
        catch (err) {
            console.error('Error while invoking function', err);
            return { ok: false, error: 'FUNCTION_ERROR', details: err.message };
        }
    }
    async processRunCode(request) {
        const secrets = (0, common_2.truthy)(request.secrets, 'Secrets are required');
        const payload = {
            secrets: secrets.custom,
            backendApiKey: secrets.backendApiKey,
            functionName: request.functionToRun,
            params: request.params,
            auth: request.auth,
            context: request.context,
            codeDir: process.cwd(),
            executeFunctionAnnotationType: request.executeFunctionAnnotationType,
        };
        return await this.executeActionRequest({ action: 'executeFunction', payload });
    }
};
LocalBackendService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], LocalBackendService);
exports.LocalBackendService = LocalBackendService;
//# sourceMappingURL=local-backend.service.js.map
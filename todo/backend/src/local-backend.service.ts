import { Injectable } from '@nestjs/common';

import * as BackendService from './index';
import {
  ActionRequest,
  ExecuteFunctionPayload,
  RunConfigurationRequest,
  transformParams,
  transformResponse,
  truthy,
} from '@squidcloud/common';

@Injectable()
export class LocalBackendService {
  private async executeActionRequest(
    actionRequest: ActionRequest,
  ): Promise<any> {
    const { action } = actionRequest;
    if (action !== 'executeFunction') {
      console.error('UNSUPPORTED ACTION!!! ', action);
      return { ok: false, error: 'INVALID_ACTION' };
    }
    const payload = actionRequest.payload as ExecuteFunctionPayload;
    const [serviceName, fnName] = payload.functionName.split(':');
    let fn;
    if (serviceName === 'default') {
      fn = BackendService[serviceName][fnName];
    } else {
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
      const transformedParams = transformParams(
        payload.params,
        payload.executeFunctionAnnotationType,
      );
      const functionResponse = await fn(...transformedParams);
      const transformedResponse = transformResponse(
        functionResponse,
        payload.executeFunctionAnnotationType,
      );
      return { ok: true, functionResponse: transformedResponse };
    } catch (err) {
      console.error('Error while invoking function', err);
      return { ok: false, error: 'FUNCTION_ERROR', details: err.message };
    }
  }

  async processRunCode(request: RunConfigurationRequest): Promise<any> {
    const secrets = truthy(request.secrets, 'Secrets are required');
    const payload: ExecuteFunctionPayload = {
      secrets: secrets.custom,
      backendApiKey: secrets.backendApiKey,
      functionName: request.functionToRun,
      params: request.params,
      auth: request.auth,
      context: request.context,
      codeDir: process.cwd(),
      executeFunctionAnnotationType: request.executeFunctionAnnotationType,
    };
    return await this.executeActionRequest({
      action: 'executeFunction',
      payload,
    });
  }
}

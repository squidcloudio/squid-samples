import { LocalBackendService } from './local-backend.service';
import { RunConfigurationRequest } from '@squidcloud/common';
import { Response } from 'express';
export declare class LocalBackendController {
    private readonly localBackendService;
    constructor(localBackendService: LocalBackendService);
    runCode(request: RunConfigurationRequest, res: Response): Promise<void>;
    healthCheck(res: Response): Promise<void>;
}

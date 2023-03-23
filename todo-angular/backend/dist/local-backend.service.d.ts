import { RunConfigurationRequest } from '@squidcloud/common';
export declare class LocalBackendService {
    private executeActionRequest;
    processRunCode(request: RunConfigurationRequest): Promise<any>;
}

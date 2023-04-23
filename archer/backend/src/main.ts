import { bootstrapLocalBackend, LocalBackendModule } from '@squidcloud/local-backend';
import * as backendService from './index';

bootstrapLocalBackend(LocalBackendModule.forRoot(backendService)).then();

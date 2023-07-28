import { bootstrapLocalBackend, LocalBackendModule } from '@squidcloud/local-backend';
import * as backendService from './index';

/*****************************
 *                           *
 *    INTERNAL USE ONLY      *
 *    DO NOT MODIFY          *
 *                           *
 *****************************/

bootstrapLocalBackend(LocalBackendModule.forRoot(backendService)).then();

import { secureApi, secureDatabase, SquidService } from '@squidcloud/backend';
import { ApiCallContext } from '@squidcloud/client';

export class ExampleService extends SquidService {
  @secureApi('catFacts')
  secureCatFacts(context: ApiCallContext): boolean {
    return true; // Allows all access to the catFacts integration
  }

  // TODO: !!!IMPORTANT!!! - Replace this function with your own granular security rules
  @secureDatabase('all', 'built_in_db')
  allowAllAccessToBuiltInDb(): boolean {
    return true;
  }
}

import { SquidService, secureDatabase } from '@squidcloud/backend';

export class DataSecurityService extends SquidService {
  // IMPORTANT: In your own code, you should use granular security rules instead of leaving the database open. This is for demonstration purposes only.
  @secureDatabase('read', 'built_in_db')
  allowAllAccessToBuiltInDb(): boolean {
    return true;
  }
}

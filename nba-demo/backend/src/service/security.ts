import { secureCollection, secureDatabase, SquidService } from '@squidcloud/backend';

export class SecurityService extends SquidService {
  @secureDatabase('all', 'built_in_db')
  allowAllAccessToBuiltInDb(): boolean {
    // return this.isAuthenticated();
    return true;
  }

  @secureCollection('players', 'read')
  allowPlayersRead(): boolean {
    return true;
  }
}

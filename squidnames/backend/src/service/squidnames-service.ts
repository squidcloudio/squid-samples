import { secureDatabase, secureDistributedLock, SquidService } from '@squidcloud/backend';

export class SquidnamesService extends SquidService {
  @secureDatabase('all', 'built_in_db')
  allowAllAccessToBuiltInDb(): boolean {
    return true;
  }

  @secureDistributedLock('gameLock')
  allowAllAccessToAcquiringLock(): boolean {
    return true;
  }
}

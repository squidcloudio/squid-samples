import { scheduler, secureDatabase, secureDistributedLock, SquidService } from '@squidcloud/backend';
import { CronExpression } from '@squidcloud/client';
import { GameState } from 'common/common-types';

export class SquidnamesService extends SquidService {
  @secureDatabase('all', 'built_in_db')
  allowAllAccessToBuiltInDb(): boolean {
    // NOTE: This is insecure! Whenever appropriate, logic should be added here to
    // secure access.
    //
    // Possible things to secure:
    // - Users only make valid modifications based on their team color.
    // - Client IDs that are not part of the game do not make modifications.
    // - Spymasters should have read-only access to the game.
    //
    // These are more appropriately secured in a write-specific function such as:
    // ```
    // @secureDatabase('write', 'built_in_db')
    // checkModifications(context: MutationContext)
    // ```
    return true;
  }

  @secureDistributedLock()
  allowAllAccessToAcquiringLock(): boolean {
    // NOTE: This is insecure! Whenever appropriate, logic should be added here to
    // secure access.
    //
    // Possible thing to secure: Spymasters should not be able to acquire a lock as they
    // have no reason to make any modifications.
    return true;
  }

  @scheduler('gameCleanup', CronExpression.EVERY_HOUR)
  async gameCleanup(): Promise<void> {
    const maxAge = 24 * 60 * 60 * 1000; // 1 day in milliseconds
    const games = await this.squid
      .collection<GameState>('games')
      .query()
      .where('lastAccess', '<', new Date().getTime() - maxAge)
      .snapshot();
    games.forEach((gameRef) => {
      const id = gameRef.data.id;
      gameRef
        .delete()
        .then(() => {
          console.log(`Cleaned up old game ID: ${id}`);
        })
        .catch((error) => {
          console.error(`Failed to delete game ID: ${id}`, error);
        });
    });
  }
}

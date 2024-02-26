import { scheduler, SquidService } from '@squidcloud/backend';
import { CronExpression } from '@squidcloud/client';
import { parsePlayerStats } from '../utils';

export class PlayersService extends SquidService {
  @scheduler({
    id: 'pollPlayerStats',
    cron: CronExpression.EVERY_12_HOURS,
  })
  async pollPlayerStats() {
    const playersResponse = await this.squid.api().get('nba', 'FullHistoricalPlayersV2022', {
      pathParams: {
        league: 'nba',
        leagueid: '00',
        seasonyear: '2023',
      },
    });
    const parsedPlayers = parsePlayerStats(playersResponse.body);
    await this.squid.runInTransaction(async (txId) => {
      parsedPlayers.forEach((player) => {
        void this.squid.collection('players').doc(player.playerId.toString()).insert(player, txId);
      });
    });
  }
}

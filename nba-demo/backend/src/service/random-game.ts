import { scheduler, SquidService } from '@squidcloud/backend';
import { CronExpression } from '@squidcloud/client';
import { getRandomScheduleGame, parseBoxScoreResponse } from '../utils';

export class RandomGameService extends SquidService {
  @scheduler({
    id: 'pollRandomGame',
    cron: CronExpression.EVERY_5_SECONDS,
  })
  async pollRandomGame() {
    const scheduleResponse = await this.squid.api().get('nba', 'TeamSchedule', {
      pathParams: {
        league: 'nba',
        seasonyear: '2023',
        teamname: 'warriors',
        seasontype: '02',
      },
    });

    const gameId = getRandomScheduleGame(scheduleResponse.body);

    const boxScoreResponse = await this.squid.api().get('nba', 'BoxScoreGameV2022', {
      pathParams: {
        gameid: gameId,
        league: 'nba',
        seasonyear: '2023',
      },
    });

    const data = parseBoxScoreResponse(boxScoreResponse.body);
    await this.squid.collection('randomGame').doc('randomGame').insert(data);
  }
}

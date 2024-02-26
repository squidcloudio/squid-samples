import { executable, SquidService, webhook } from '@squidcloud/backend';
import { WebhookRequest } from '@squidcloud/client';
import { lastValueFrom } from 'rxjs';

export class AiService extends SquidService {
  @webhook('getRandomFact')
  async getRandomPlayerFactWebhook(request: WebhookRequest) {
    return this.getRandomPlayerFactInternal(request.body.name);
  }

  @executable()
  async getRandomFact(name) {
    return this.getRandomPlayerFactInternal(name);
  }

  async getRandomPlayerFactInternal(name) {
    return await lastValueFrom(
      this.squid.ai().chatbot('nba-chat').profile('player-facts').chat(`Tell me a fact about ${name}`),
    );
  }

  @webhook('comparePlayers')
  async comparePlayersWebhook(request: WebhookRequest) {
    const { pid1, pid2 } = request.body;
    return this.comparePlayersInternal(pid1, pid2);
  }

  @executable()
  async comparePlayers(pid1, pid2) {
    return this.comparePlayersInternal(pid1, pid2);
  }

  async comparePlayersInternal(pid1, pid2) {
    const prompt = `Compare the stats between the player with ID ${pid1} and the player with ID ${pid2} and generate a three sentence summary highlighting the differences. Refer to the players by name, not by unique ID.`;
    const response = await this.squid.ai().executeAiQuery('built_in_db', prompt);
    return response.answer;
  }
}

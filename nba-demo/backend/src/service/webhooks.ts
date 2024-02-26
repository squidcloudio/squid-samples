import { SquidService, webhook } from "@squidcloud/backend";
import { WebhookRequest } from "@squidcloud/client";
import { lastValueFrom } from "rxjs";

export class WebhooksService extends SquidService {
  @webhook("getRandomFact")
  async getRandomPlayerFact(request: WebhookRequest) {
    const { body } = request;
    return await lastValueFrom(
      this.squid
        .ai()
        .chatbot("nba-chat")
        .profile("player-facts")
        .chat(`Tell me a fact about ${body.name}`),
    );
  }

  @webhook("comparePlayers")
  async comparePlayers(request: WebhookRequest) {
    const { pid1, pid2 } = request.body;
    const prompt = `Compare the stats between the player with ID ${pid1} and the player with ID ${pid2} and generate a three sentence summary highlighting the differences. Refer to the players by name, not by unique ID.`;
    const response = await this.squid
      .ai()
      .executeAiQuery("nba-bigquery", prompt);
    return response.answer;
  }
}

import { SquidService, executable } from '@squidcloud/backend';

export class SquidAiDataService extends SquidService {
  @executable()
  async askQuestion(question: string): Promise<string> {
    const aiResponse = await this.squid.ai().executeAiQuery('built_in_db', question);
    console.log(
      `Question: ${question} 
        Query: ${aiResponse.executedQuery ?? 'No query executed'} 
        Explanation: ${aiResponse.explanation ?? 'No explanation'}`,
    );
    return aiResponse.answer;
  }
}

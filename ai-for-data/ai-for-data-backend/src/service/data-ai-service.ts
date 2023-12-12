import { SquidService, executable } from '@squidcloud/backend';

interface AiResponse {
  author: string;
  answer: string;
  executedQuery?: string;
  explanation?: string;
}

export class SquidAiDataService extends SquidService {
  @executable()
  async askQuestion(question: string): Promise<AiResponse> {
    const aiResponse = await this.squid.ai().executeAiQuery('built_in_db', question);
    return {
      author: 'ai',
      answer: aiResponse.answer,
      executedQuery: aiResponse.executedQuery,
      explanation: aiResponse.explanation,
    };
  }
}

import { secureAiAssistant, SquidService } from '@squidcloud/backend';

export class AiSecurityService extends SquidService {
  @secureAiAssistant('squid-facts', 'chat', 'squid-facts-assistant')
  allowChat(): boolean {
    return this.isAuthenticated();
  }
}

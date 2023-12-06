import { secureAiChatbot, SquidService } from '@squidcloud/backend';
/* 
  This service allows only authenticated users to chat with the AI assistant.
  For more information on securing your Squid AI assistant, see the documentation:
  https://docs.squid.cloud/docs/development-tools/backend/security-rules/secure-ai-assistant
*/
export class AiSecurityService extends SquidService {
  @secureAiChatbot('squid-facts', 'chat', 'squid-facts-assistant')
  allowChat(): boolean {
    return this.isAuthenticated();
  }
}

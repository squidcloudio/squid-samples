import { secureAiAssistant, SquidService, webhook } from "@squidcloud/backend";
import { WebhookRequest } from "@squidcloud/common";

/**
 * Here you can define different backend functions that:
 * 1 - Can be called from the frontend
 * 2 - Can secure data access
 * 3 - Can be called as a trigger
 * 4 - Can define a webhook
 * 5 - Can be called as a scheduler
 * 6 - And more
 *
 * Note: This code will be executed in a secure environment and can perform any operation including database access,
 * API calls, etc.
 *
 * For more information and examples see: https://docs.squid.cloud/docs/backend/
 */
export class ExampleService extends SquidService {
  @secureAiAssistant("MyWebsiteAssitant", "chat")
  allowChat(): boolean {
    return true;
  }

  @webhook("askQuestion")
  async askQuestion(request: WebhookRequest): Promise<string> {
    if (!request.body?.question) throw new Error("MISSING_QUESTION");

    const p: Promise<string> = new Promise((resolve, reject) => {
      let res = "";
      this.squid
        .ai()
        .assistant("MyWebsiteAssitant")
        .profile("Vfunctions")
        .chat(request.body.question)
        .subscribe({
          next: (answer) => {
            res = answer;
          },
          error: () => reject("INTERNAL_ERROR"),
          complete: () => {
            resolve(res);
          },
        });
    });
    return await p;
  }
}

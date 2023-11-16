import { executable, secureDatabase, SquidService } from '@squidcloud/backend';
import nodemailer from 'nodemailer';

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
 * For more information and examples see: https://docs.squid.cloud/docs/development-tools/backend/
 */
export class ExampleService extends SquidService {
  // TODO: !!!IMPORTANT!!! - Replace this function with your own granular security rules
  @secureDatabase('all', 'built_in_db')
  allowAllAccessToBuiltInDb(): boolean {
    return true;
  }

  @executable()
  async sendEmail(from: string, subject: string, body: string): Promise<boolean> {
    try {
      const transporter = nodemailer.createTransport({
        service: 'YOUR_EMAIL_SERVICE',
        auth: {
          user: 'YOUR_EMAIL@DOMAIN',
          pass: 'YOUR_PASSWORD'
        }
      });

      await transporter.sendMail({
        from: 'YOUR_EMAIL@DOMAIN',
        to: 'YOUR_EMAIL@DOMAIN',
        replyTo: from,
        subject: subject,
        text: body,
      });
    } catch (e) {
      console.log(e);
      return false;
    }
    return true;
  }

  @executable()
  async generateApiKey(name: string): Promise<string> {
    return (await this.squid.secrets.apiKeys.upsert(name)).value as string;
  }

  @executable()
  async validateApiKey(key: string): Promise<boolean> {
    const keys = await this.squid.secrets.apiKeys.getAll();
    for (const [_, entry] of Object.entries(keys)) {
      if (entry.value === key) {
        return true
      }
    }
    return false;
  }
}

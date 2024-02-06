import { executable, secureDatabase, SquidService } from '@squidcloud/backend';
import nodemailer from 'nodemailer';

/**
 * Contains our backend implementation.
 *
 * For this sample, it contains our `@executable`s for:
 *   - Sending an email.
 *   - Generating an API key.
 *   - Validating an API key.
 */
export class ExecutorService extends SquidService {
  @executable()
  async sendEmail(from: string, subject: string, body: string): Promise<boolean> {
    const username = (await this.squid.secrets.get('email_username'))?.value;
    const password = (await this.squid.secrets.get('email_password'))?.value;
    try {
      const transporter = nodemailer.createTransport({
        service: 'YOUR_EMAIL_SERVICE',
        auth: {
          user: username,
          pass: password,
        },
      });

      await transporter.sendMail({
        from: 'YOUR_EMAIL@DOMAIN',
        to: 'RECEIVER_EMAIL@DOMAIN',
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
  async validateApiKey(name: string, key: string): Promise<boolean> {
    const expectedKey = await this.squid.secrets.apiKeys.get(name);
    return expectedKey !== undefined && expectedKey.value === key;
  }
}

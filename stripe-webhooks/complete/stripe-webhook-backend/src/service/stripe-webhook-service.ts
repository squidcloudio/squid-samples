import { SquidService, webhook } from '@squidcloud/backend';
import { WebhookRequest, WebhookResponse } from '@squidcloud/client';

export class StripeWebhookService extends SquidService {
  async addInvoiceToDatabase(stripeUserId: string, invoiceId: string, paid: boolean): Promise<string> {
    const paidStatus = paid ? 'paid' : 'unpaid';

    try {
      // Find user in database
      const userDocs = await this.squid.collection('userPayments').query().eq('stripeUserId', stripeUserId).snapshot();

      // This section is for demo purposes.
      // In your own code, you would want to handle the case where a user is not found in the database.
      if (userDocs.length === 0) {
        console.log('new user found, adding to database');
        const newInvoices = { [invoiceId]: paidStatus };
        await this.squid
          .collection('userPayments')
          .doc('squidUserId123')
          .insert({ stripeUserId: stripeUserId, invoices: newInvoices });
        return 'new user, database update complete';
      }

      const newInvoices = { ...userDocs[0].data.invoices, [invoiceId]: paidStatus };
      await userDocs[0].update({ invoices: newInvoices });
      return 'database update complete';
    } catch (error) {
      console.error(error);
      return error.message;
    }
  }

  @webhook('handleStripePayment')
  async handleStripePayment(request: WebhookRequest): Promise<WebhookResponse | any> {
    const stripeUserId = request.body.data.object.customer;
    const invoiceId = request.body.data.object.id;
    const response = await this.addInvoiceToDatabase(stripeUserId, invoiceId, true);
    return this.createWebhookResponse(response);
  }
}

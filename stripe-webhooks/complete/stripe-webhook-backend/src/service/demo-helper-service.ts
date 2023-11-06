import { SquidService, executable } from '@squidcloud/backend';

export class AddDataService extends SquidService {
  @executable()
  async addMockData(stripeUserId: string): Promise<void> {
    const invoiceObject = {};
    const prefix = 'in_';
    for (let i = 0; i < 5; i++) {
      const invoiceId = prefix.concat(
        Array.from(Array(38), () => Math.floor(Math.random() * 36).toString(36)).join(''),
      );

      const paid = Math.random() > 0.5 ? 'paid' : 'unpaid';
      invoiceObject[invoiceId] = paid;
    }
    const userId = this.getUserAuth()?.userId;
    await this.squid
      .collection('userPayments')
      .doc(userId)
      .update({ squidUserId: userId, stripeUserId: stripeUserId, invoices: invoiceObject });
  }
}

import { SquidService, secureCollection } from '@squidcloud/backend';
import { QueryContext, MutationContext } from '@squidcloud/common';

interface UserPayment {
  stripeUserId: string;
  squidUserId: string;
  invoices: { [key: string]: string };
}

export class DatabaseSecurityService extends SquidService {
  @secureCollection('userPayments', 'write')
  secureItemsWrite(context: MutationContext<UserPayment>): boolean {
    const userAuth = this.getUserAuth();
    if (!userAuth) return false;

    // only admins can edit the payments
    return !!userAuth.attributes['admin'];
  }

  @secureCollection('userPayments', 'read')
  secureItemsRead(context: QueryContext<UserPayment>): boolean {
    const userAuth = this.getUserAuth();
    const userId = userAuth?.userId;

    if (!userAuth) {
      return false;
    }

    // only admins can read all payments
    if (userAuth.attributes['admin']) {
      return true;
    }

    return context.isSubqueryOf('__id' as any, '==', userId!);
  }
}

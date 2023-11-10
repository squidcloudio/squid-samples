export interface UserPayment {
  stripeUserId: string;
  squidUserId: string;
  invoices: {
    [invoiceId: string]: string;
  };
}

export enum OrderStatus {
  // the order has been created, but the ticket it's trying to order has not been reserved
  Created = "created",

  // the ticket the order is trying to reserve has already been reserved
  // the user has cancelled the order
  // the order expires before payment
  Cancelled = "cancelled",

  // the order has successfully reserved the ticket
  AwaitingPayment = "awaiting:payment",

  // the order has reserved the ticket and the user has provided payment successfully
  Complete = "complete",
}

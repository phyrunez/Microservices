import mongoose from "mongoose";
import { TicketUpdatedEvent } from "@vcticketing/common";
import { Message } from "node-nats-streaming";

import { TicketUpdatedListener } from "../ticket-updated-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { Ticket } from "../../../models/ticket";

const setup = async () => {
  // create an instance of the listener
  const listener = new TicketUpdatedListener(natsWrapper.client);
  // create and save a ticket
  const ticket = Ticket.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 20,
  });
  await ticket.save();
  // create a fake data object
  const data: TicketUpdatedEvent["data"] = {
    id: ticket.id,
    version: ticket.version + 1,
    title: "new concert",
    price: 25,
    userId: "user",
  };
  // create a fake msg object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };
  return { listener, ticket, data, msg };
};

it("finds, updates and saves a ticket", async () => {
  const { listener, ticket, data, msg } = await setup();
  // call the onMessage func with the data object + message object
  await listener.onMessage(data, msg);
  // test
  const updatedTicket = await Ticket.findById(ticket.id);
  expect(updatedTicket!.title).toEqual(data.title);
  expect(updatedTicket!.price).toEqual(data.price);
  expect(updatedTicket!.version).toEqual(data.version);
});

it("acks the message", async () => {
  const { listener, data, msg } = await setup();
  // call the onMessage func with the data object + message object
  await listener.onMessage(data, msg);
  // test
  expect(msg.ack).toHaveBeenCalled();
});

it("not call ack with out-of-order version event", async () => {
  const { listener, ticket, data, msg } = await setup();
  // call the onMessage func with the data object + message object with wrong version
  data.version = 10;
  try {
    await listener.onMessage(data, msg);
  } catch (err) {}
  // test
  expect(msg.ack).not.toHaveBeenCalled();
});

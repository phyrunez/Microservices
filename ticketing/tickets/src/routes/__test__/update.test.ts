import request from "supertest";
import mongoose from "mongoose";

import { app } from "../../app";
import { natsWrapper } from "../../nats-wrapper";

it("update a does not existed ticket", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({
      title: "title",
      price: 10,
    })
    .expect(404);
});

it("update without authentication", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: "title",
      price: 10,
    })
    .expect(401);
});

it("user does not own the ticket", async () => {
  // create a ticket
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "title1",
      price: 10,
    });

  // update that ticket with different user
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", global.signin()) // another user
    .send({
      title: "title2",
      price: 10,
    })
    .expect(401);
});

it("invalid title or price", async () => {
  const cookie = global.signin();

  // create a ticket
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "title",
      price: 10,
    });

  // update with invalid title
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "",
      price: 10,
    })
    .expect(400);

  // update with invalid price
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "title",
      price: -10,
    })
    .expect(400);
});

it("valid inputs", async () => {
  const cookie = global.signin();

  // create a ticket
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "title",
      price: 10,
    });

  // update that ticket
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "new title",
      price: 20,
    })
    .expect(200);

  // get that updated ticket
  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send();

  expect(ticketResponse.body.title).toEqual("new title");
  expect(ticketResponse.body.price).toEqual(20);
});

it("publishes an event", async () => {
  const cookie = global.signin();

  // create a ticket
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "title",
      price: 10,
    });

  // update that ticket
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "new title",
      price: 20,
    })
    .expect(200);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});

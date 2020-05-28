import request from "supertest";

import { app } from "../../app";

const createTicket = (title: string) => {
  return request(app).post("/api/tickets").set("Cookie", global.signin()).send({
    title,
    price: 10,
  });
};

it("fetch ticksts", async () => {
  await createTicket("ticket1");
  await createTicket("ticket2");
  await createTicket("ticket3");

  const response = await request(app).get("/api/tickets").send().expect(200);
  expect(response.body.length).toEqual(3);
});

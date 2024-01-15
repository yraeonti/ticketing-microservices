import request from "supertest";
import { app } from "../../app";

it("test sign in route", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@gmail.com",
      password: "secret",
    })
    .expect(201);
  const res = await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@gmail.com",
      password: "secret",
    })
    .expect(201);

  expect(res.get("Set-Cookie")).toBeDefined();
});

import fs from "fs";
import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import request from "supertest";
import { DB_PATH } from "./db";
import { server } from "./main";

before(() => {
  if (fs.existsSync(DB_PATH)) {
    fs.rmSync(DB_PATH);
  }
});
after(() => server.close());

test("finds user", async () => {
  const res = await request(server)
    .post("/users/find")
    .send({ email: "foo@bar.com" })
    .expect("Content-Type", /json/)
    .expect(200);

  const body = await res.body;

  assert.deepEqual(body, {
    user: {
      email: "foo@bar.com",
      hobbies: ["skiing"],
      id: 1,
      phone: "+81-0736-7841",
    },
  });
});

test("add user", async () => {
  const res = await request(server)
    .post("/users/add")
    .send({
      email: "new@bar.com",
      phone: "+81-9916-7304",
      hobbies: "sleeping,dreaming",
    })
    .expect("Content-Type", /json/)
    .expect(200);

  const body = await res.body;

  assert.deepEqual(body, {
    user: {
      id: 3,
      email: "new@bar.com",
      phone: "+81-9916-7304",
      hobbies: ["sleeping", "dreaming"],
    },
  });
});

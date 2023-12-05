// we need this for typeORM reflection
import "reflect-metadata";

import express, { Request } from "express";
import http from "http";
import { EntityManager } from "typeorm";
import { z, ZodType } from "zod";
import { User } from "./db";
import { transactional } from "./util";

const SERVER_PORT = 8080;

// use express as the server
export const app = express();
app.use(express.json());

// parses and validates the input, throws on schema mismatch
const parse = async <T extends ZodType>(
  schema: T,
  req: Request,
): Promise<z.infer<T>> => {
  return schema.parseAsync(req.body);
};

// finds the user by email, phone number or both
// throws if the fields belong to 2 different users
const findUser = async (
  em: EntityManager,
  email?: string | null,
  phone?: string | null,
) => {
  let users = await em.find(User, {
    where: [{ email: email ?? undefined }, { phone: phone ?? undefined }],
  });

  // make sure it matches 1 user
  if (users.length == 0) return undefined;
  if (users.length > 1)
    throw new Error("user email and phone number belong to different users");
  return users[0];
};

app.post("/users/find", transactional, async (req, res, next) => {
  const findUserSchema = z
    .object({
      email: z.string().email("Not a valid email").nullable().optional(),
      phone: z.string().nullable().optional(),
    })
    .superRefine((input) => {
      if (!input.email && !input.phone)
        throw new Error("Either 'email' or 'phone' is required");
    });

  const query = await parse(findUserSchema, req).catch(next);
  if (!query) return;

  const user = await findUser(req.em!, query.email, query.phone).catch(next);
  if (!user) {
    return res.status(400).json({
      errors: ["no user found matching the email/phone number"],
    });
  }

  return res.json({ user });
});

app.post("/users/add", transactional, async (req, res, next) => {
  const findUserSchema = z.object({
    email: z.string().email("Not a valid email"),
    phone: z.string().optional(),
    hobbies: z
      .string()
      .transform((value) => value.split(","))
      .pipe(z.array(z.string())),
  });

  const query = await parse(findUserSchema, req).catch(next);
  if (!query) return;
  console.log(query);

  let user = await findUser(req.em!, query.email, query.phone).catch(next);
  if (user) return res.status(400).json({ error: ["user already exists"] });

  user = new User();
  user.email = query.email;
  user.phone = query.phone;
  user.hobbies = query.hobbies;

  await req.em!.save(user).catch(next);
  return res.json({ user });
});

// basic json error handler
app.use((err: any, req: any, res: any, next: any) => {
  res.status(500).json({ error: err });
});

// start the server
export const server = new http.Server(app);
server.listen(SERVER_PORT, () =>
  console.log(`Server is listening on port ${SERVER_PORT}...`),
);

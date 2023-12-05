import { NextFunction, Request, Response } from "express";
import { ZodType, z } from "zod";
import { database } from "./db";

// parses and validates input, throws on schema mismatch
export const parseQuery = async <T extends ZodType>(
  schema: T,
  data: any,
): Promise<Exclude<z.infer<T>, void>> => {
  return schema.parseAsync(data);
};

// transaction middleware for express, reduces human error surface
export const transactional = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  (await database()).transaction((em) => {
    return new Promise((resolve) => {
      req.em = em;
      res.on("finish", () => resolve(null));
      next();
    });
  });
};

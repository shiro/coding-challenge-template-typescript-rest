declare namespace Express {
  export interface Request {
    em?: import("typeorm").EntityManager;
  }
}

import { Request, Response } from "express";

export type RequestContext = Request & {
  session: {
    userId?: number;
  };
  user: UserType;
};

export type ResponseContext = Response & {
  session: {
    userId?: number;
  };
  user: UserType;
};

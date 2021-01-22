import { Request, Response } from "express";

export type RequestContext = Request & {
  session: {
    userId?: any;
  };
  user: UserType;
};

export type ResponseContext = Response & {
  session: {
    userId?: any;
  };
  user: UserType;
};

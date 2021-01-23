import { Request, Response } from "express";
import { UserType } from "./UserType";

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

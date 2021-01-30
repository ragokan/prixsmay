import { Request, Response } from "express";
import { IUser } from "./IUser";

export type RequestContext = Request & {
  session: {
    userId?: number;
  };
  user: IUser;
};

export type ResponseContext = Response & {
  session: {
    userId?: number;
  };
  user: IUser;
};

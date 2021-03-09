import { Request, Response } from "express";
import { IUser } from "./UserType";

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

import { Request, Response } from "express";
import { UserType } from "./UserType";

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

// interface ReqBody extends RequestContext {
//   body: {
//     name: string;
//   };
// }

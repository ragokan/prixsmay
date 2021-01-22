import { NextFunction, Request, Response } from "express";

export default (routeFounction: Function) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(routeFounction(req, res, next)).catch(next);

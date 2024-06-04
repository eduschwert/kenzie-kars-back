import { Request, Response, NextFunction } from "express";
import { ZodTypeAny } from "zod";

const ensureDataIsValidMiddleware =
  (schema: ZodTypeAny) =>
  (req: Request, _: Response, next: NextFunction): void => {
    const validatedData = schema.parse(req.body);
    req.body = validatedData;

    return next();
  };

export default ensureDataIsValidMiddleware;

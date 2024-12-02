import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const handleErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res
      .status(400)
      .json({ ok: false, msg: "Bad request", errors: errors.mapped() });
    return;
  }

  next();
};

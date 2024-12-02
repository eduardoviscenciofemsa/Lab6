import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("x-token");

    if (!token) {
      res.status(401).json({ ok: false, msg: "Token is required" });

      return;
    }

    const seed = process.env.JWT_SEED;

    if (!seed) {
      throw new Error("Seed is not defined");
    }

    const decodedToken = jwt.verify(token, seed);

    if (!decodedToken) {
      res.status(401).json({ ok: false, msg: "Invalid token" });

      return;
    }

    next();
  } catch (error) {
    res.status(500).json({ ok: false, msg: error ?? "Internal server error" });
  }
};

import jwt from "jsonwebtoken";

type PayloadT = {
  username: string;
};

export const createToken = (payload: PayloadT) => {
  try {
    const seed = process.env.JWT_SEED;

    if (!seed) {
      throw new Error("Seed is not defined");
    }

    const token = jwt.sign(payload, seed, { expiresIn: "2h" });

    if (!token) {
      throw new Error("Token could not be created");
    }

    return token;
  } catch (error) {
    throw error;
  }
};

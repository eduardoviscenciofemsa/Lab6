import { TypedRequest, TypedResponse } from "../types";

import { createToken } from "../helpers/jwt.helper";

type LoginRequestT = {
  username: string;
  password: string;
};

type LoginResponseT = {
  token: string;
};

export const login = async (
  req: TypedRequest<LoginRequestT>,
  res: TypedResponse<LoginResponseT>
) => {
  try {
    const { username } = req.body;

    const token = createToken({ username });

    res
      .status(200)
      .json({ ok: true, msg: "Login successful", data: { token } });
  } catch (error) {
    res.status(500).json({ ok: false, msg: "Internal server error" });
  }
};

export const logout = async (_req: TypedRequest, res: TypedResponse) => {
  try {
    res.status(200).json({ ok: true, msg: "Logout successful" });
  } catch (error) {
    res.status(500).json({ ok: false, msg: "Internal server error" });
  }
};

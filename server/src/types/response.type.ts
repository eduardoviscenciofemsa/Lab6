import { Response } from "express";

export interface TypedResponse<T = unknown> extends Response {
  json: (body: { ok: boolean; msg?: string; data?: T }) => this;
}

import { Request } from "express";

export const logRequest = (req: Request) => {
  console.log(`Request received: ${req.method} ${req.url}\n${JSON.stringify(req.body,null,2)}\n`);
};

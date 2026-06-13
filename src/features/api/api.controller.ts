import { type Request, type Response } from "express";

export class ApiController {
  health(_req: Request, res: Response) {
    return res.json({ status: "Working :)" });
  }
}

import { type Request, type Response } from "express";
import { UserService } from "./user.service";

export class UserController {
  constructor(private service: UserService) {}

  findAllUsers = async (_req: Request, res: Response) => {
    try {
      const users = await this.service.findAll();
      return res.json(users);
    } catch (err: any) {
      return res.status(400).json({ message: err.message || "Server error" });
    }
  };
}

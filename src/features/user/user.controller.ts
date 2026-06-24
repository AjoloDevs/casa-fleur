import { type Request, type Response } from "express";
import { UserSchema, UserUpdateSchema } from "./user.schema";
import { UserService } from "./user.service";

export class UserController {
  constructor(private service: UserService) { }

  findAll = async (_req: Request, res: Response) => {
    try {
      const users = await this.service.findAll();
      return res.json(users);
    } catch (err) {
      return res.status(500).json({ message: "Server error" });
    }
  };

  findById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await this.service.findById(id as string);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.json(user);
    } catch (err) {
      return res.status(500).json({ message: "Server error" });
    }
  };

  create = async (req: Request, res: Response) => {
    const result = UserSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid data", errors: result.error.issues });
    }

    try {
      const user = await this.service.create(result.data);
      return res.status(201).json(user);
    } catch (err: any) {
      return res.status(400).json({ message: err.message || "Server error" });
    }
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Invalid credential" });
    }

    const result = UserUpdateSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid data", errors: result.error.issues });
    }

    try {
      const user = await this.service.update(id as string, result.data);
      return res.json(user);
    } catch (err: any) {
      return res.status(400).json({ message: err.message || "Server error" });
    }
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Invalid credential" });
    }

    try {
      await this.service.delete(id as string);
      return res.json({ message: "User deleted" });
    } catch (err: any) {
      return res.status(400).json({ message: err.message || "Server error" });
    }
  };
}

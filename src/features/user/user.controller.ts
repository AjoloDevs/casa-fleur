import { type Request, type Response } from "express";
import { UserSchema, UserUpdateSchema } from "./user.schema";
import { UserService } from "./user.service";

export class UserController {
  constructor(private service: UserService) { }

  findAllUsers = async (_req: Request, res: Response) => {
    try {
      const users = await this.service.findAll();
      return res.json(users);
    } catch (err: any) {
      return res.status(400).json({ message: err.message || "Server error" });
    }
  };

  createUser = async (req: Request, res: Response) => {
    const result = UserSchema.safeParse(req.body)
    if (!result.success) {
      return res.status(400).json({ message: "Invalid data", errors: result.error.issues })
    }
    const validatedData = result.data
    try {
      const user = await this.service.create(validatedData)
      return res.status(201).json(user)
    } catch (err: any) {
      return res.status(400).json({ message: err.message || "Server error" });
    }
  }

  updateUser = async (req: Request, res: Response) => {
    const { id } = req.params
    const result = UserUpdateSchema.safeParse(req.body)
    if (!id) {
      return res.status(400).json({ message: "Invalid credential" })
    }
    if (!result.success) {
      return res.status(400).json({ message: "Invalid data", errors: result.error.issues })
    }
    const validatedData = result.data
    try {
      const userUpdate = await this.service.update(id as string, validatedData)
      return res.json(userUpdate)
    } catch (err: any) {
      return res.status(400).json({ message: err.message || "Server error" });
    }
  }

  deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params
    if (!id) {
      return res.status(400).json({ message: "Invalid credential" })
    }
    try {
      await this.service.delete(id as string)
      return res.json({ message: "User deleted" })
    } catch (err: any) {
      return res.status(400).json({ message: err.message || "Server error" });
    }

  }

}

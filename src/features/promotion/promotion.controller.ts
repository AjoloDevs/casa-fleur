import { type Request, type Response } from "express";
import { PromotionService } from "./promotion.service";
import { PromotionSchema, PromotionUpdateSchema } from "./promotion.schema";

export class PromotionController {
  constructor(private service: PromotionService) { }

  findAll = async (_req: Request, res: Response) => {
    try {
      const promotions = await this.service.findAll()
      return res.json(promotions)
    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
  }

  create = async (req: Request, res: Response) => {
    const result = PromotionSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid data", errors: result.error.issues });
    }
    try {
      const promotion = await this.service.create(result.data)
      return res.status(201).json(promotion);
    } catch (err: any) {
      return res.status(400).json({ message: err.message || "Server error" });
    }
  }

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Invalid credential" });
    }

    const result = PromotionUpdateSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid data", errors: result.error.issues });
    }

    try {
      const promotion = await this.service.update(id as string, result.data);
      return res.json(promotion);
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
      return res.json({ message: "Promotion deleted" });
    } catch (err: any) {
      return res.status(400).json({ message: err.message || "Server error" });
    }
  };

}




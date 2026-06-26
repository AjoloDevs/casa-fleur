import { type Request, type Response } from "express";
import { ProductSchema, ProductUpdateSchema } from "./product.schema";
import { ProductService } from "./product.service";

export class ProductController {
  constructor(private service: ProductService) { }

  findAll = async (_req: Request, res: Response) => {
    try {
      const products = await this.service.findAll();
      return res.json(products);
    } catch (err) {
      return res.status(500).json({ message: "Server error" });
    }
  };

  findByTerm = async (req: Request, res: Response) => {
    try {
      const { term } = req.params;
      const product = await this.service.findByTerm(term as string);
      if (!product) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.json(product);
    } catch (err) {
      return res.status(500).json({ message: "Server error" });
    }
  };


  create = async (req: Request, res: Response) => {
    const result = ProductSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid data", errors: result.error.issues });
    }
    try {
      const product = await this.service.create(result.data)
      return res.status(201).json(product);
    } catch (err: any) {
      return res.status(400).json({ message: err.message || "Server error" });
    }
  }

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Invalid credential" });
    }

    const result = ProductUpdateSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid data", errors: result.error.issues });
    }

    try {
      const product = await this.service.update(id as string, result.data);
      return res.json(product);
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
      return res.json({ message: "Product deleted" });
    } catch (err: any) {
      return res.status(400).json({ message: err.message || "Server error" });
    }
  };

}

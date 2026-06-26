import { Router } from "express";
import prisma from "../../config/db.config";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";

const service = new ProductService(prisma);
const controller = new ProductController(service);
const router = Router();

router.get("/", controller.findAll);
router.get("/:term", controller.findByTerm);
router.post("/", controller.create);
router.patch("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;

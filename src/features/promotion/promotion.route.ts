import { Router } from "express";
import prisma from "../../config/db.config";
import { PromotionService } from "./promotion.service";
import { PromotionController } from "./promotion.controller";

const service = new PromotionService(prisma);
const controller = new PromotionController(service);
const router = Router();

router.get("/", controller.findAll);
router.post("/", controller.create);
router.patch("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;

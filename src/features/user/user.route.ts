import { Router } from "express";
import prisma from "../../config/db.config";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";

const service = new UserService(prisma);
const controller = new UserController(service);
const router = Router();

router.get("/", controller.findAll);
router.get("/:id", controller.findById);
router.post("/", controller.create);
router.patch("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;

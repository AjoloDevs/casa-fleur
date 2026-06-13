import { Router } from "express";
import prisma from "../../config/db.config";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";

const service = new UserService(prisma);
const controller = new UserController(service);
const UserRoute = Router();

UserRoute.get("/", controller.findAllUsers);

export default UserRoute;

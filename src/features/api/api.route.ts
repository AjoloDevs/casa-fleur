import { Router } from "express";
import { ApiController } from "./api.controller";

const ApiRoute = Router();
const controller = new ApiController();

ApiRoute.use("/health", controller.health);

export default ApiRoute;

import { Router } from "express";
import ApiRoute from "./features/api/api.route";
import userRouter from "./features/user/user.route";

const router = Router();
router.use("/api", ApiRoute);
router.use("/user", userRouter);

export default router;

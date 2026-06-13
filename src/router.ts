import { Router } from "express";
import ApiRoute from "./features/api/api.route";
import UserRoute from "./features/user/user.route";

const router = Router();
router.use("/api", ApiRoute);
router.use("/user", UserRoute);

export default router;

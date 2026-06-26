import { Router } from "express";
import ApiRoute from "./features/api/api.route";
import userRoute from "./features/user/user.route";
import productRoute from "./features/product/product.route"

const router = Router();
router.use("/api", ApiRoute);
router.use("/user", userRoute);
router.use("/product", productRoute);

export default router;

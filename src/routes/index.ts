import { Router } from "express";
const router = Router();
import userRouter from "./userRoutes";
import bookRouter from "./bookRoutes";

router.use("/users", userRouter);
router.use("/books", bookRouter);

export default router;

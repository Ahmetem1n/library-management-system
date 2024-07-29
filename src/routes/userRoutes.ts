import validate from "../middlewares/validationMiddleware";
import { Router } from "express";
import {
  addUser,
  borrowBook,
  getUser,
  getUsers,
  returnBook,
} from "../controllers/userController";
import {
  getUserSchema,
  addUserSchema,
  borrowBookSchema,
  returnBookSchema,
} from "../validations/userValidations";

const userRoutes = Router();

userRoutes.get("/", getUsers);
userRoutes.get("/:userId", validate(getUserSchema), getUser);
userRoutes.post("/", validate(addUserSchema), addUser);
userRoutes.post(
  "/:userId/borrow/:bookId",
  validate(borrowBookSchema),
  borrowBook
);
userRoutes.post(
  "/:userId/return/:bookId",
  validate(returnBookSchema),
  returnBook
);

export default userRoutes;

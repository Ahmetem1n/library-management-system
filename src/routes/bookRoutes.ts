import validate from "../middlewares/validationMiddleware";
import { Router } from "express";
import { addBook, getBook, getBooks } from "../controllers/bookController";
import { addBookSchema } from "../validations/bookValidations";

const bookRoutes = Router();

bookRoutes.get("/", getBooks);
bookRoutes.get("/:bookId", getBook);
bookRoutes.post("/", validate(addBookSchema), addBook);

export default bookRoutes;

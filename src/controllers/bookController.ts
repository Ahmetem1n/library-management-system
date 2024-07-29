/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from "express";
import { createResponse, createErrorResponse } from "../utils/createResponse";
import {
  createBook,
  findBooksByFilter,
  getBookWithUserBookHistory,
} from "../services/bookService";

const getBooks = async (req: Request, res: Response) => {
  try {
    const findBooks = await findBooksByFilter();
    createResponse(res, "Books returned successfully.", findBooks);
  } catch (error) {
    // @ts-ignore
    createErrorResponse(req, res, error.message, error.statusCode, error.data);
  }
};

const getBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;

    // @ts-ignore
    const findBook = await getBookWithUserBookHistory(bookId);

    const scores = findBook?.userBooks.map((userBook) => userBook.score) ?? [];
    const averageScore =
      scores.length > 0
        ? scores.reduce((acc, score) => acc + score, 0) / scores.length
        : null;

    createResponse(res, "Book detail returned successfully.", {
      id: findBook?.id,
      name: findBook?.name,
      score: averageScore ? averageScore.toFixed(2) : -1,
    });
  } catch (error) {
    // @ts-ignore
    createErrorResponse(req, res, error.message, error.statusCode, error.data);
  }
};

const addBook = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const createdBook = await createBook({ name });
    createResponse(res, "Book created successfully.", createdBook);
  } catch (error) {
    // @ts-ignore
    createErrorResponse(req, res, error.message, error.statusCode, error.data);
  }
};

export { getBooks, getBook, addBook };

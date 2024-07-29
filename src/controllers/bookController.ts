/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  createBook,
  findBooksByFilter,
  getBookWithUserBookHistory,
} from "../services/bookService";

const getBooks = async (req: Request, res: Response) => {
  try {
    const findBooks = await findBooksByFilter();
    res.status(StatusCodes.OK).send(findBooks);
  } catch (error) {
    // @ts-ignore
    res.status(500).send(error.message);
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

    res.json({
      id: findBook?.id,
      name: findBook?.name,
      score: averageScore ? averageScore.toFixed(2) : -1,
    });
  } catch (error) {
    // @ts-ignore
    res.status(500).send(error.message);
  }
};

const addBook = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    await createBook({ name });
    res.status(StatusCodes.CREATED).send();
  } catch (error) {
    // @ts-ignore
    res.status(500).send(error.message);
  }
};

export { getBooks, getBook, addBook };

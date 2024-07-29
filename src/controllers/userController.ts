/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { findOneBookByFilter } from "../services/bookService";
import {
  createUserBook,
  findOneUserBookByFilter,
} from "../services/userBookService";
import {
  createUser,
  findOneUserByFilter,
  findUsersByFilter,
  getUserWithBookHistory,
} from "../services/userService";

const getUsers = async (req: Request, res: Response) => {
  try {
    const findUsers = await findUsersByFilter();
    res.status(StatusCodes.OK).send(findUsers);
  } catch (error) {
    // @ts-ignore
    res.status(500).send(error.message);
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // @ts-ignore
    const findUser = await getUserWithBookHistory(userId);

    const userResponse = {
      id: findUser?.id,
      name: findUser?.name,
      books: {
        past: findUser?.userBooks
          .filter((userBook) => userBook.returnDate !== null)
          .map((userBook) => ({
            name: userBook.book.name,
            userScore: userBook.score,
          })),
        present: findUser?.userBooks
          .filter((userBook) => userBook.returnDate === null)
          .map((userBook) => ({
            name: userBook.book.name,
          })),
      },
    };

    res.json(userResponse);
  } catch (error) {
    // @ts-ignore
    res.status(500).send(error.message);
  }
};

const addUser = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    await createUser({ name });
    res.status(StatusCodes.CREATED).send();
  } catch (error) {
    // @ts-ignore
    res.status(500).send(error.message);
  }
};

const borrowBook = async (req: Request, res: Response) => {
  try {
    const { userId, bookId } = req.params;

    await findOneUserByFilter({ id: userId });
    await findOneBookByFilter({ id: bookId });

    const findUserBook = await findOneUserBookByFilter(
      { bookId, returnDate: null },
      false
    );
    if (findUserBook) {
      return res.status(500).send(
        // @ts-ignore
        findUserBook.userId === userId
          ? "This book is already with this user."
          : "This book is currently with another user."
      );
    }

    await createUserBook({ userId, bookId, borrowDate: new Date() });

    res.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    // @ts-ignore
    res.status(500).send(error.message);
  }
};

const returnBook = async (req: Request, res: Response) => {
  try {
    const { userId, bookId } = req.params;
    const { score } = req.body;

    await findOneUserByFilter({ id: userId });
    await findOneBookByFilter({ id: bookId });

    const findUserBook = await findOneUserBookByFilter(
      { userId, bookId, returnDate: null },
      false
    );

    if (!findUserBook) {
      return res
        .status(500)
        .send(
          "This book cannot be returned because it is not currently with this user."
        );
    }

    // @ts-ignore
    findUserBook?.returnDate = new Date();
    if (score) findUserBook.score = score;
    await findUserBook?.save();

    res.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    // @ts-ignore
    res.status(500).send(error.message);
  }
};

export { getUsers, getUser, addUser, borrowBook, returnBook };

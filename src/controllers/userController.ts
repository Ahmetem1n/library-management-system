/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createResponse, createErrorResponse } from "../utils/createResponse";
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
    createResponse(res, "Users returned successfully.", findUsers);
  } catch (error) {
    // @ts-ignore
    createErrorResponse(req, res, error.message, error.statusCode, error.data);
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

    createResponse(res, "User detail returned successfully.", userResponse);
  } catch (error) {
    // @ts-ignore
    createErrorResponse(req, res, error.message, error.statusCode, error.data);
  }
};

const addUser = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const createdUser = await createUser({ name });
    createResponse(res, "User created successfully.", createdUser);
  } catch (error) {
    // @ts-ignore
    createErrorResponse(req, res, error.message, error.statusCode, error.data);
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
      return createErrorResponse(
        req,
        res,
        // @ts-ignore
        findUserBook.userId === userId
          ? "This book is already with this user."
          : "This book is currently with another user.",
        StatusCodes.BAD_REQUEST
      );
    }

    await createUserBook({ userId, bookId, borrowDate: new Date() });

    createResponse(res, "User borrowed book successfully.");
  } catch (error) {
    // @ts-ignore
    createErrorResponse(req, res, error.message, error.statusCode, error.data);
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
      return createErrorResponse(
        req,
        res,
        "This book cannot be returned because it is not currently with this user.",
        StatusCodes.BAD_REQUEST
      );
    }

    // @ts-ignore
    findUserBook?.returnDate = new Date();
    if (score) findUserBook.score = score;
    await findUserBook?.save();

    createResponse(res, "User returned book successfully.");
  } catch (error) {
    // @ts-ignore
    createErrorResponse(req, res, error.message, error.statusCode, error.data);
  }
};

export { getUsers, getUser, addUser, borrowBook, returnBook };

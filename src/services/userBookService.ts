import CustomError from "../errors";
import { UserBook } from "../models";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createUserBook = async (userBookData: any) => {
  const createdUserBook = await UserBook.create(userBookData);
  return createdUserBook;
};

const findUserBooksByFilter = async (
  filter: object = {},
  orderBy: string = "id",
  orderSort: "ASC" | "DESC" = "DESC"
) => {
  const findUserBooks = await UserBook.findAll({
    where: {
      ...filter,
    },
    order: [[orderBy, orderSort]],
  });

  return findUserBooks;
};

const findOneUserBookByFilter = async (
  filter: object = {},
  throwError: boolean = true,
  orderBy: string = "id",
  orderSort: "ASC" | "DESC" = "DESC"
) => {
  const findUserBook = await UserBook.findOne({
    where: {
      ...filter,
    },
    order: [[orderBy, orderSort]],
  });

  if (!findUserBook && throwError)
    throw new CustomError.NotFoundError("User book does not exists.");

  return findUserBook;
};

export { createUserBook, findUserBooksByFilter, findOneUserBookByFilter };

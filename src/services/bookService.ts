import { Op } from "sequelize";
import { Book, UserBook } from "../models";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createBook = async (bookData: any) => {
  const createdBook = await Book.create(bookData);
  return createdBook;
};

const createInitialBooks = async () => {
  const initialBooks = [
    { id: 1, name: "The Hitchhiker's Guide to the Galaxy" },
    { id: 2, name: "I, Robot" },
    { id: 3, name: "Dune" },
    { id: 4, name: "1984" },
    { id: 5, name: "Brave New World" },
  ];

  const existBooks = await findBooksByFilter({
    id: { [Op.in]: initialBooks.map((book) => book.id) },
  });
  const newBooks = initialBooks.filter(
    (book) => !existBooks.map((exitBook) => exitBook.id).includes(book.id)
  );

  for (const book of newBooks) {
    await Book.create({ name: book.name });
  }
};

const findBooksByFilter = async (
  filter = {},
  orderBy = "id",
  orderSort = "DESC"
) => {
  const findBooks = await Book.findAll({
    where: {
      ...filter,
    },
    order: [[orderBy, orderSort]],
  });

  return findBooks;
};

const findOneBookByFilter = async (
  filter = {},
  throwError = true,
  orderBy = "id",
  orderSort = "DESC"
) => {
  const findBook = await Book.findOne({
    where: {
      ...filter,
    },
    order: [[orderBy, orderSort]],
  });

  if (!findBook && throwError) throw new Error("Book does not exists.");

  return findBook;
};

const getBookWithUserBookHistory = async (
  bookId: number,
  throwError: boolean = true
) => {
  const findBook = await Book.findOne({
    where: { id: bookId },
    include: [
      {
        model: UserBook,
        attributes: ["score"],
        required: false,
      },
    ],
  });

  if (!findBook && throwError) throw new Error("Book does not exists.");

  return findBook;
};

export {
  createBook,
  createInitialBooks,
  findBooksByFilter,
  findOneBookByFilter,
  getBookWithUserBookHistory,
};

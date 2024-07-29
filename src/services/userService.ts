import CustomError from "../errors";
import { Op } from "sequelize";
import { Book, User, UserBook } from "../models";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createUser = async (userData: any) => {
  const createdUser = await User.create(userData);
  return createdUser;
};

const createInitialUsers = async () => {
  const initialUsers = [
    { id: 1, name: "Eray Aslan" },
    { id: 2, name: "Enes Faruk Meniz" },
    { id: 3, name: "Kadir Mutlu" },
    { id: 4, name: "Sefa Eren Şahin" },
  ];

  const existUsers = await findUsersByFilter({
    id: { [Op.in]: initialUsers.map((user) => user.id) },
  });
  const newUsers = initialUsers.filter(
    (user) => !existUsers.map((exitUser) => exitUser.id).includes(user.id)
  );

  for (const user of newUsers) {
    await User.create({ name: user.name });
  }
};

const findUsersByFilter = async (
  filter: object = {},
  orderBy: string = "id",
  orderSort: "ASC" | "DESC" = "DESC"
) => {
  const findUsers = await User.findAll({
    where: {
      ...filter,
    },
    order: [[orderBy, orderSort]],
  });

  return findUsers;
};

const findOneUserByFilter = async (
  filter: object = {},
  throwError: boolean = true,
  orderBy: string = "id",
  orderSort: "ASC" | "DESC" = "DESC"
) => {
  const findUser = await User.findOne({
    where: {
      ...filter,
    },
    order: [[orderBy, orderSort]],
  });

  if (!findUser && throwError)
    throw new CustomError.NotFoundError("User does not exists.");

  return findUser;
};

const getUserWithBookHistory = async (
  userId: number,
  throwError: boolean = true
) => {
  const findUser = await User.findByPk(userId, {
    include: [
      {
        model: UserBook,
        include: [Book],
      },
    ],
  });

  if (!findUser && throwError)
    throw new CustomError.NotFoundError("User does not exists.");

  return findUser;
};

export {
  createUser,
  createInitialUsers,
  findUsersByFilter,
  findOneUserByFilter,
  getUserWithBookHistory,
};

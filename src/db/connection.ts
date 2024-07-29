import config from "../config";
import { Sequelize } from "sequelize-typescript";
import { Book, User, UserBook } from "../models";

const sequelize = new Sequelize({
  database: config.dbName,
  username: config.dbUsername,
  password: config.dbPassword,
  host: config.dbHost,
  port: config.dbPort,
  dialect: "postgres",
  models: [User, Book, UserBook],
});

export default sequelize;

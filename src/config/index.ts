import dotenv from "dotenv";
const envFound = dotenv.config();
process.env.NODE_ENV = process.env.NODE_ENV || "development";

if (envFound.error) throw new Error("Couldn't find .env file");

const config: {
  NODE_ENV: "development" | "production";
  port: number;
  dbName: string;
  dbUsername: string;
  dbPassword: string;
  dbHost: string;
  dbPort: number;
} = {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  dbName: process.env.DB_DATABASE,
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
};

export default config;

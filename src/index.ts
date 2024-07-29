// import "reflect-metadata";
import express from "express";

// express
const app = express();

// config
import config from "./config";

// database
import connectDB from "./db/connect";

// routers
import routes from "./routes";

// middlewares
import notFoundMiddleware from "./middlewares/not-found";
import errorHandlerMiddleware from "./middlewares/error-handler";
import throttleMiddleware from "./middlewares/throttle";
import { createInitialUsers } from "./services/userService";
import { createInitialBooks } from "./services/bookService";

app.use(throttleMiddleware);
app.use(express.json());

app.use("/", routes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

async function startServer() {
  try {
    console.log(`Server is starting on port ${config.port}...`);
    await connectDB();
    await createInitialUsers();
    await createInitialBooks();
    app.listen(config.port, () =>
      console.log(`Server is started on port ${config.port}...`)
    );
  } catch (error) {
    console.error(error);
  }
}

startServer();

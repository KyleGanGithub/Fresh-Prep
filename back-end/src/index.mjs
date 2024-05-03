import express from "express";
import cors from "cors";
import idRouter from "./routes/id.mjs";
import usersRouter from "./routes/users.mjs";
import { loggingMiddleware } from "./middleware/logger.mjs";
import Helpers from "./utils/helpers.mjs";

const app = express();
app.use(express.json());
app.use(cors());
Helpers.connectToDb();
app.use(loggingMiddleware);
app.use(idRouter);
app.use(usersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Running on Port ${PORT} `);
});
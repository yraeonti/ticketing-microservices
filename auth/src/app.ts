import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import {
  signInRouter,
  currentUserRouter,
  signOutRouter,
  signUpRouter,
} from "./routes";
import { errorHandler } from "../middlewares/errorHandler";
import { NotFoundError } from "./errors/NotFoundError";

const app = express();

app.set("trust proxy", true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(currentUserRouter);
app.use(signUpRouter);
app.use(signInRouter);
app.use(signOutRouter);

app.all("*", (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };

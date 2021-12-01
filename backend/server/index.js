import http from "http";
import express from "express";
import logger from "morgan";
import cors from "cors";

// mongo connection
import "../config/mongo.js";

// routes
import indexRouter from "../routes/index.js";
import userRouter from "../routes/user.js";
import chatRouter from "../routes/chat.js";
import deleteRouter from "../routes/delete.js";

// middlewares
import { decode } from '../middlewares/jwt.js'
import { authAdmin } from '../middlewares/auth.js'

import dotenv from 'dotenv'

dotenv.config()

const app = express();

/** Get port from environment and store in Express. */
const port = process.env.PORT || "3000";
app.set("port", port);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/users", authAdmin, userRouter);
app.use("/chat", decode, chatRouter);
app.use("/delete", decode, deleteRouter);

/** catch 404 and forward to error handler */
app.use('*', (req, res) => {
  return res.status(404).json({
    success: false,
    message: 'API endpoint doesnt exist'
  })
});

/** Create HTTP server. */
const server = http.createServer(app);
/** Listen on provided port, on all network interfaces. */
server.listen(port);
/** Event listener for HTTP server "listening" event. */
server.on("listening", () => {
  console.log(`Listening on port:: http://localhost:${port}/`)
});
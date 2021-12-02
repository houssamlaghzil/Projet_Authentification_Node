import http from "http";
import express from "express";
import logger from "morgan";
import { Server } from 'socket.io';

// socket configuration
import WebSockets from "../sockets/WebSockets.js";

// mongo connection
import "../config/mongo.js";

// routes
import indexRouter from "../routes/index.js";
import userRouter from "../routes/user.js";
import chatRouter from "../routes/chat.js";

// middlewares
import { decode } from '../middlewares/jwt.js'
import { authAdmin } from '../middlewares/auth.js'

import dotenv from 'dotenv'

import cors from "cors";

dotenv.config()

const app = express();

/** Get port from environment and store in Express. */
const port = process.env.PORT || "3002";
app.set("port", port);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token");
  res.header("Access-Control-Request-Headers", "X-Requested-With, accept, content-type");
  next();
});

app.use(cors());
app.options('*', cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/users", authAdmin, userRouter);
app.use("/chat", decode, chatRouter);

/** catch 404 and forward to error handler */
app.use('*', (req, res) => {
  return res.status(404).json({
    success: false,
    message: 'API endpoint doesnt exist'
  })
});

/** Create HTTP server. */
const server = http.createServer(app);

/** Create socketio */
const socketio = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

global.io = socketio.listen(server);

global.io.on('connection', WebSockets.connection)

/** Listen on provided port, on all network interfaces. */
server.listen(port);
/** Event listener for HTTP server "listening" event. */
server.on("listening", () => {
  console.log(`Listening on port:: http://localhost:${port}/`)
});
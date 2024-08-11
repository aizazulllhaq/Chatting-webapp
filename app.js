import express from "express";
import { createServer } from "http";
import bodyParser from "body-parser";
import userRouter from "./routes/User.Routes.js";
import dotenv from "dotenv";
import { PORT } from "./constant.js";
import dbConnection from "./db/dbConnection.js";
import {
  checkAuthentication,
  restrictFromSecureRoutes,
} from "./middlewares/Auth.js";
import cookieParser from "cookie-parser";
import homeRouter from "./routes/Home.Routes.js";

dotenv.config({
  path: ".env",
});

dbConnection();

const app = express();
const server = createServer(app);

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", "./view");
app.use(checkAuthentication);

app.use("/", userRouter);
app.use("/home", restrictFromSecureRoutes(["NORMAL", "ADMIN"]), homeRouter);

server.listen(PORT, () => {
  console.log(`Server running on : http://localhost:${PORT}`);
});

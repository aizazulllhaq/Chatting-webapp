import { Router } from "express";
import {
  loginPage,
  LoginUser,
  logoutUser,
  Register,
  registerPage,
} from "../controllers/User.Controller.js";
import upload from "../utils/multer.js";

const userRouter = Router();

userRouter
  .get("/register", registerPage)
  .post("/register", upload.single("profileImg"), Register)
  .get("/login", loginPage)
  .post("/login", LoginUser)
  .get("/logout", logoutUser);

export default userRouter;

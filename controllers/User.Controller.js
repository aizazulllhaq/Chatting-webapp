import User from "../models/User.Model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import wrapAsync from "../utils/wrapAsync.js";

// API ENDPOINTS  : /api/v1/users

// USER AUTHENTICATION :

// Registration Controller /register
export const Register = wrapAsync(async (req, res, next) => {
  // validate req.body is all required parameters exists; -> apply in routes
  // get data from req.body;
  const { name, email, password } = req.body;
  const profileImg = req.file;

  // Check with email is it exists;
  const isUser = await User.findOne({ email });

  if (isUser) return res.status(404).json({ message: "Invalid Credentials" });

  // Create New User;
  const newUser = new User({
    name,
    email,
    password,
    profileImg: profileImg?.filename,
  });

  await newUser.save();

  // Generate AccessToken for it;
  const accessToken = await newUser.generateAccessToken();

  // return detail response with
  return res.cookie("accessToken", accessToken).render("Authentication/Login", {
    message: "Registration Successfull please login",
  });
});

// Login Controller /login
export const LoginUser = wrapAsync(async (req, res, next) => {
  // validate req.body ( email - password ); apply in routes

  // get {email,password } from req.body
  const { email, password } = req.body;

  // Check user by email , if not exists return error message
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: "Invalid Credentials" });

  // check if user email verified
  if (!user.isVerified)
    return res
      .status(400)
      .json({ message: "Please Verify your mail to login" });

  // Validate user password
  const isPasswordMatch = await user.isPasswordCorrect(password);

  if (!isPasswordMatch)
    return res.status(400).json({ message: "Invalid Credentials" });

  // Generate AccessToken for it;
  const accessToken = await user.generateAccessToken();

  // return response;
  return res
    .status(200)
    .cookie("accessToken", accessToken, {
      httpOnly: true,
    })
    .redirect("/home");
});



// Logout Controller /logout
export const logoutUser = wrapAsync((req, res, next) => {
  // remove accessToken from user cookies
  return res
    .status(200)
    .clearCookie("accessToken")
    .json({ message: "User Logout Successfully" });
});

// USER PAGES :

export const registerPage = (req, res) => {
  res.render("Authentication/Register");
};

export const loginPage = (req, res) => {
  res.render("Authentication/Login");
};

import { model, Schema } from "mongoose";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constant.js";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImg: {
      type: String,
    },
    role: {
      type: String,
      enum: ["NORMAL", "ADMIN"],
      default: "NORMAL",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await hash(this.password, 10); //  return password-hash
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await compare(password, this.password); // return ( true, false)
};

userSchema.methods.generateAccessToken = function () {
  const payload = {
    id: this._id,
    role: this.role,
    email: this.email,
    isVerified: this.isVerified,
  };

  const token = jwt.sign(payload, JWT_SECRET);

  return token;
};

const User = model("User", userSchema);

export default User;

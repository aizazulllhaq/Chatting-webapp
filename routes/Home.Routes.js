import { Router } from "express";
import User from "../models/User.Model.js";
import wrapAsync from "../utils/wrapAsync.js";

const homeRouter = Router();

const people = [
  {
    name: "Leslie Alexander",
    role: "Co-Founder of Meta",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Leslie Alexander",
    role: "Javascript Developer",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Leslie Alexander",
    role: "Grahpics Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Leslie Alexander",
    role: "Programmer",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  // More people...
];
const messages = [
  {
    msg: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    isCurrent:true,
    timeStamp:"2:43pm"
  },
  {
    msg: "Qui atque doloremque hic et architecto maiores ipsum dolorum mollitia voluptatibus natus.",
    isCurrent:false,
    timeStamp:"9:03am"
  },
  {
    msg: "Qui atque doloremque hic et architecto maiores ipsum dolorum mollitia voluptatibus natus e hic et architecto maiores ipsum dolorum mollitia voluptatibus natus.",
    isCurrent:false,
    timeStamp:"12:13am"
  },
  {
    msg: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui atque doloremque hic et ",
    isCurrent:true,
    timeStamp:"01:30pm"
  },
  {
    msg: "Lorem ipsum dolor,",
    isCurrent:false,
    timeStamp:"04:00am"
  },
  // More people...
];

homeRouter.get(
  "/",
  wrapAsync(async (req, res, next) => {
    const uid = req.user.id;

    const user = await User.findById(uid);

    const users = await User.find({ _id: { $ne: uid } });

    return res.status(200).render("Home", {
      user: user,
      users: users,
      people: people,
      messages: messages,
    });
  })
);

export default homeRouter;

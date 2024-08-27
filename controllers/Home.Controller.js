import User from "../models/User.Model";
import wrapAsync from "../utils/wrapAsync";

export const home = wrapAsync(async (req, res, next) => {
  const uid = req.user.id;

  const users = await User.find({ _id: { $ne: uid } });

  res.status(200).render("Home", {
    people: users,
  });
});

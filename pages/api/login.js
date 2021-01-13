import dbConnect from "../../util/dbConnect";
const User = require("../../Model/User.js");
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

dbConnect();

const KEY = "saddsjknvchhckhhfdjkhbvf564254dfsfdsfcvcv";
export default async (req, res) => {
  if (req.method !== "POST") {
    return res.status(400).send("The provided method is not supported");
  }
  const emailvalidator = await User.findOne({ email: req.body.email });

  const usernamevalidator = await User.findOne({
    username: req.body.email,
  });
  console.log(req)
  /* try {
    if (emailvalidator) {
      const validPassword = await bcrypt.compare(
        req.body.password,
        emailvalidator.password
      );
      if (!validPassword) {
        return res.status(400).json({ error: "password is invalid" });
      }
      const token = jwt.sign({ User: emailvalidator }, KEY);
      return res.status(200).json({ token: token });
    } else if (usernamevalidator) {
      const validPassword = await bcrypt.compare(
        req.body.password,
        usernamevalidator.password
      );
      if (!validPassword) {
        return res.status(400).json({ error: "password is invalid" });
      }
      const token = jwt.sign({ User: usernamevalidator }, KEY);
      return res.status(200).json({ token: token });
    } else {
      return res.status(404).send("User does not exist");
    }
  } catch (e) {
    res.status(404).send("Server error: " + e.message);
  }
};

export const config = {
  api: {
    bodyParser: process.env.NODE_ENV !== "production",
  }, */
};

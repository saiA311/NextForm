import dbConnect from "../../util/dbConnect";
const User = require("../../Model/User.js");
import bcrypt from "bcrypt";

dbConnect();

export default async (req, res) => {
  if (req.method !== "POST") {
    return res.status(400).send("The provided method is not supported");
  }
  const emailvalidator = await User.findOne({ email: req.body.email });
  const usernamevalidator = await User.findOne({ username: req.body.username });
  if (usernamevalidator) {
    return res.status(400).send("username already registered");
  } else if (emailvalidator) {
    return res.status(400).send("email already registered");
  }
  const salt = await bcrypt.genSalt(10);
  const hashpassword = await bcrypt.hash(req.body.password, salt);
  const userDetails = await {
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: hashpassword,
  };
  try {
    const data = await User.create(userDetails);
    res.status(201).send("New User successfully created");
  } catch (error) {
    console.log(error);
    res.status(400).send("User creation unsuccessful");
  }
};

export const config = {
  api: {
    bodyParser: process.env.NODE_ENV !== "production",
  },
};

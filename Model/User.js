const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, min: 6, max: 100, require: true },
  username: { type: String, min: 6, max: 30, require: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

module.exports =
  mongoose.models.user || mongoose.model("user", userSchema, "FormDB");

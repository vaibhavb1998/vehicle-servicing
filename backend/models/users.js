// packages
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { DateTime } = require("luxon");
const jwt = require("jwt-simple");
const Schema = mongoose.Schema;

// create schema
const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    userType: {
      type: String,
      enum: ["admin", "worker", "user"],
      default: "user",
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    landline: {
      type: String,
    },
  },
  { timestamp: true }
);

userSchema.method({
  async passwordMatches(password) {
    const result = await bcrypt.compare(password, this.password);

    return result;
  },
  token() {
    const date = DateTime.local();
    const payload = {
      _id: this._id,
      exp: date.plus({ minutes: 60 * 24 }).toSeconds(),
      iat: date.toSeconds(),
    };

    return jwt.encode(payload, process.env.JWT_SECRET);
  },
});
module.exports = User = mongoose.model("user", userSchema);

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    eventsEnrolled: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        default: [],
      },
    ],
    eventsCreated: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

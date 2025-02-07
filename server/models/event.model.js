const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    hostName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    attendees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    targetAudience: {
      type: String,
      enum: ["public", "private"],
      default: "public",
      required: true,
    },
    eventMode: {
      type: String,
      enum: ["in person", "virtual"],
      default: "in person",
      required: true,
    },
    eventLocation: {
      type: String,
      required: true,
    },
    eventContact: {
      type: String,
      required: true,
      trim: true,
    },
    eventDateTime: {
      type: String,
      required: true,
    },
    ticketPrice: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    ticketQuantity: {
      type: Number,
      required: true,
      default: 100,
      min: 0,
    },
    sponsors: {
      type: [String],
      default: [],
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);

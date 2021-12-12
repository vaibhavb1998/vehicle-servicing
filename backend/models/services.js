// packages
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const ServiceSchema = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    workerId: { type: mongoose.Types.ObjectId, ref: "User" },
    vehicleType: {
      type: String,
      enum: ["truck", "bus", "four-wheeler", "three-wheeler", "two-wheeler"],
    },
    serviceType: [
      {
        type: String,
        enum: [
          "washing",
          "cleaning",
          "servicing",
          "part-replacement",
          "oil-change",
        ],
      },
    ],
    vehicleNumber: {
      type: String,
    },
    price: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    completedOn: { type: Date },
  },
  { timestamps: true }
);

module.exports = Service = mongoose.model("service", ServiceSchema);

const { Schema, model } = require("mongoose");

const pharmacySchema = new Schema(
  {
    pharmacyName: {
      type: String,
      required: [true, "Please provide your pharmacy name."],
    },
    email: {
      type: String,
      required: [true, " Please provide your email."],
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
    },
    registrationNumber: {
      type: String,
      required: [true, "Please provide your registration number"],
    },
    location: {
      type: String,
      required: [true, "Please provide your location"],
    },
    // role: {
    //   type: String,
    //   enum: "ADMIN",
    //   default: "USER",
    // },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Products",
      },
    ],
  },

  { timestamps: true },
);
module.exports = model("Pharmacy", pharmacySchema);

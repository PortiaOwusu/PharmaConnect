const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    pharmacyId: {
      type: Schema.Types.ObjectId,
      ref: "Pharmacy",
    },
    title: {
      type: String,
      required: [true, "Please provide bramd name of medicine."],
    },
    genericName: {
      type: String,
      required: [true, "Please provide generic name of medicine."],
    },
    image: [
      {
        type: String,
        required: [true, "Please provide an image of the medicine."],
      },
    ],
    description: {
      type: String,
      required: [true, "Please provide a description for your medicine."],
    },
    quantity: {
      type: Number,
      required: [true, " Please provide quantity available."],
    },
    price: {
      type: Number,
      required: [true, "Please provide price of medicine"],
    },
    manufactureDate: {
      type: Date,
      required: [true, "Please provide expiry date of medicine"],
    },
    expiryDate: {
      type: Date,
      required: [true, "Please provide expiry date of medicine"],
    },

    // buyer: {
    //   type: Schema.Types.ObjectId,

    // },
    prescription: {
      type: Boolean,
      required: [true, "Please add if this is a prescription based medication"],
    },
  },

  { timestamps: true },
);

module.exports = model("Product", productSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PortraitSchema = new Schema(
  {
    artist: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    funFact: {
      type: String,
      required: true,
    },
    imgName: {
      required: true,
      type: String,
    },
    imgId: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Portrait = mongoose.model("Portrait", PortraitSchema);

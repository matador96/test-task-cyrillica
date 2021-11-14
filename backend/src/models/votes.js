const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = mongoose.model(
  "Votes",
  new Schema(
    {
      id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      sex: {
        type: String,
        enum: ["male", "female"],
        required: true,
      },
      provider: {
        type: String,
        required: true,
      },
      language: {
        type: String,
        required: true,
      },
      providerLanguage: {
        type: String,
        required: true,
      },
      flags: {
        type: Schema.Types.Mixed,
        required: true,
      },
    },
    { timestamps: true }
  )
);

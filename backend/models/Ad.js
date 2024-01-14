const mongoose = require("mongoose");

const AdSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Naslov je obavezan."] },
    description: { type: String },
    image: { type: Buffer, required: true },
    imageType: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
  }
);

AdSchema.virtual("srcImage").get(function () {
  if (this.image != null && this.imageType != null) {
    return `data:${this.imageType};charset=utf-8;base64,${this.image.toString(
      "base64"
    )}`;
  }
});

module.exports = mongoose.model("Ad", AdSchema);

const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Naziv je obavezan."],
      unique: true,
    },
    multisize: { type: Boolean, required: true, default: false },
    sizes: { type: [String] },
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

CategorySchema.post("save", function (error, doc, next) {
  if (
    error.code === 11000 &&
    Object.entries(error.keyPattern)[0][0] === "name"
  ) {
    next(
      new Error("Category Validation failed: name: Već postoji ovaj naziv.")
    );
  } else {
    next();
  }
});

CategorySchema.virtual("srcImage").get(function () {
  if (this.image != null && this.imageType != null) {
    return `data:${this.imageType};charset=utf-8;base64,${this.image.toString(
      "base64"
    )}`;
  }
});

module.exports = mongoose.model("Category", CategorySchema);

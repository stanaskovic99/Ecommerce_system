const mongoose = require("mongoose");

const NewsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email je obavezan."],
    unique: true,
  },
});

NewsletterSchema.post("save", function (error, doc, next) {
  if (
    error.code === 11000 &&
    Object.entries(error.keyPattern)[0][0] === "email"
  ) {
    next(
      new Error("Newsletter Validation failed: email: Već postoji ovaj email.")
    );
  } else {
    next();
  }
});

module.exports = mongoose.model("Newsletter", NewsletterSchema);

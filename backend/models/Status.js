const mongoose = require("mongoose");

const StatusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Ime je obavezan."],
    unique: true,
  },
  color: { type: String, required: [true, "Boja je obavezna."] },
});

StatusSchema.post("save", function (error, doc, next) {
  if (
    error.code === 11000 &&
    Object.entries(error.keyPattern)[0][0] === "name"
  ) {
    next(new Error("Status Validation failed: name: Već postoji ovo ime."));
  } else {
    next();
  }
});

module.exports = mongoose.model("Status", StatusSchema);

const mongoose = require("mongoose");

const InfoSchema = new mongoose.Schema({
  address: { type: String, required: [true, "Adresa je obavezna."] },
  moNumbers: { type: String, required: [true, "Broj telefona je obavezan."] },
  email: { type: String, required: [true, "Email je obavezan."] },
  workingHours: {
    type: String,
    required: [true, "Radno vrijeme je obavezno."],
  },
  instagram: { type: String },
  twitter: { type: String },
  pinterest: { type: String },
  facebook: { type: String },
  delivery: {
    type: mongoose.SchemaTypes.Decimal128,
    required: [true, "Cijena dostave je obavezna."],
    validate: {
      validator: (v) => v >= 0,
      message: (props) =>
        `Cijena dostave mora biti veća ili jednaka nuli. Prosljeđeno je ${props.value}.`,
    },
  },
});

module.exports = mongoose.model("Info", InfoSchema);

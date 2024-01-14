const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, "Opis transakcije je obavezan."],
    },
    date: {
      type: Date,
      required: [true, "Datum transakcije je obavezan."],
    },
    username: {
      type: String,
      required: [true, "Korisničko ime je obavezno."],
    },
    amount: {
      type: mongoose.SchemaTypes.Decimal128,
      required: [true, "Ukupna vrijednost je obavezna."],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", TransactionSchema);

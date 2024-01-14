const mongoose = require("mongoose");
const Article = require("./Article");
const Status = require("./Status");
const User = require("./User");

var notEmpty = (obj) => {
  return obj != null ? Object.entries(obj).length !== 0 : false;
};

const OrderSchema = new mongoose.Schema(
  {
    paymentId: {
      type: String,
      required: [true, "Id uplate je obavezan."],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email je obavezan."],
    },
    fullName: { type: String, required: [true, "Ime i prezime su obavezni."] },

    total: {
      type: mongoose.SchemaTypes.Decimal128,
      required: [true, "Ukupna vrijednost je obavezna."],
      validate: {
        validator: (v) => v >= 0,
        message: (props) =>
          `Ukupan iznos mora biti veći ili jednak nuli. Prosljeđeno je ${props.value}.`,
      },
    },
    address: {
      streetAndNumber: {
        type: String,
        required: [true, "Ulica i broj ulice su obavezni."],
      },
      city: { type: String, required: [true, "Grad je obavezan."] },
      postalCode: {
        type: String,
        required: [true, "Poštanski broj je obavezan."],
      },
      country: { type: String, required: [true, "Država je obavezna."] },
      additionalInfo: { type: String },
    },
    phone: { type: String, required: [true, "Broj telefona je obavezan."] },
    status: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: Status,
      default: "62ce72d6d3623d59eba8d93f",
    },
    articles: {
      type: [
        {
          _idArticle: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: Article,
            required: [true, "Article id je obavezan."],
          },
          quantity: {
            type: Number,
            default: 1,
          },
          size: {
            type: String,
          },
        },
      ],
      validate: [notEmpty, "Lista artikala iz narudžbe je obavezna."],
    },
  },
  { timestamps: true }
);

OrderSchema.post("save", function (error, doc, next) {
  if (
    error.code === 11000 &&
    Object.entries(error.keyPattern)[0][0] === "paymentId"
  ) {
    next(
      new Error("Order Validation failed: paymentId: Već postoji narudžba.")
    );
  } else {
    next();
  }
});

module.exports = mongoose.model("Order", OrderSchema);

const mongoose = require("mongoose");
const Category = require("./Category");

var notEmpty = (arr) => {
  return arr != null ? arr.length !== 0 : false;
};

const ArticleSchema = new mongoose.Schema(
  {
    articleId: {
      type: String,
      required: [true, "Article id je obavezan."],
      unique: true,
    },
    brand: { type: String, required: [true, "Brand je obavezan."] },
    category: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: Category,
      required: [true, "Kategorija je obavezna."],
    },
    description: { type: String },
    price: {
      type: mongoose.SchemaTypes.Decimal128,
      required: [true, "Cijena je obavezna."],
      validate: {
        validator: (v) => v >= 0,
        message: (props) =>
          `Cijena mora biti veća ili jednaka nuli. Prosljeđeno je ${props.value}.`,
      },
    },
    priceWithoutDiscount: {
      type: mongoose.SchemaTypes.Decimal128,
      validate: {
        validator: (v) => v >= 0,
        message: (props) =>
          `Cijena mora biti veća ili jednaka nuli. Prosljeđeno je ${props.value}.`,
      },
    },
    shownAtHomePage: { type: Boolean, required: true, default: false },
    images: [
      {
        image: { type: Buffer, required: true },
        imageType: { type: String, required: true },
        isMainImage: { type: Boolean, required: true, default: false },
      },
    ],
    stock: {
      type: [
        {
          size: {
            type: String,
            required: [true, "Naziv veličine je obavezan."],
          },
          amount: {
            type: Number,
            required: [true, "Količina je obavezna."],
            validate: {
              validator: (v) => v >= 0,
              message: (props) =>
                `Stanje mora biti veće ili jednako nuli. Prosljeđeno je ${props.value}.`,
            },
          },
        },
      ],
      validate: [notEmpty, "Stanje artikla je obavezno."],
    },
  },
  { timestamps: true }
);

ArticleSchema.post("save", function (error, doc, next) {
  if (
    error.code === 11000 &&
    Object.entries(error.keyPattern)[0][0] === "articleId"
  ) {
    next(
      new Error(
        "Article Validation failed: articleId: Već postoji ovaj article id."
      )
    );
  } else {
    next();
  }
});

ArticleSchema.methods.getSrcImage = function (picture) {
  if (picture.image != null && picture.imageType != null) {
    return `data:${
      picture.imageType
    };charset=utf-8;base64,${picture.image.toString("base64")}`;
  }
};

module.exports = mongoose.model("Article", ArticleSchema);

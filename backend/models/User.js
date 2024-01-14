const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email je obavezan."],
      unique: true,
    },
    password: { type: String, required: [true, "Lozinka je obavezna."] },
    username: {
      type: String,
      required: [true, "Korisničko ime je obavezno."],
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    firstName: { type: String, required: [true, "Ime je obavezno."] },
    lastName: { type: String, required: [true, "Prezime je obavezno."] },
  },
  { timestamps: true }
);

const getText = (duplicateElement) => {
  switch (duplicateElement) {
    case "email":
      return "User Validation failed: email: Već postoji korisnik ovim emailom.";
    case "username":
      return "User Validation failed: username: Već postoji ovo korisničko ime.";
    default:
      return "User Validation failed: unknown: Neki problem se desilo.";
  }
};

UserSchema.post("save", function (error, doc, next) {
  if (error.code === 11000) {
    const duplicateElement = Object.entries(error.keyPattern)[0][0];
    const message = getText(duplicateElement);
    next(new Error(message));
  } else {
    next();
  }
});

module.exports = mongoose.model("User", UserSchema);

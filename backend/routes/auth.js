const router = require("express").Router();
const CryptoJS = require("crypto-js");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("./verifyToken");
const { errorFormatter } = require("../utils");

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      $or: [
        { username: req.body.usernameEmail },
        { email: req.body.usernameEmail },
      ],
    });

    if (!user) return res.status(401).json("Pogrešni kredencijali!");

    const originalPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    ).toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password)
      return res.status(401).json("Pogrešni kredencijali!");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, token: accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/loginByToken", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, token: req.user.token });
  } catch (err) {
    res.status(500).json(err);
  }
});

//FORGOT PASSWORD
router.put("/fgpass", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(500).json("Ne postoji nalog sa tim emailom.");

    const encryptedNewPassword = CryptoJS.AES.encrypt(
      req.body.newPassword,
      process.env.PASS_SEC
    ).toString();

    await User.findByIdAndUpdate(
      user._id,
      {
        $set: { password: encryptedNewPassword },
      },
      { new: true }
    );

    res.status(200).json("Uspješno izmjenjena lozinka.");
  } catch (err) {
    res.status(500).json(errorFormatter(err));
  }
});

module.exports = router;

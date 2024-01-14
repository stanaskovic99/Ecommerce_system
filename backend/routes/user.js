const router = require("express").Router();
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const User = require("../models/User");
const Newsletter = require("../models/Newsletter");
const CryptoJS = require("crypto-js");
const _ = require("lodash");
const { mapAddress, errorFormatter } = require("../utils");
const jwt = require("jsonwebtoken");

//CREATE
router.post("/", async (req, res) => {
  try {
    const bodyRequest = {
      ...req.body,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString(),
    };

    const createdUser = await User.create(bodyRequest);

    const onNewsletter =
      (await Newsletter.find({ email: req.body.email })).length !== 0;

    if (!onNewsletter) {
      await Newsletter.create({ email: req.body.email });
    }

    if (req.headers.token == null) {
      accessToken = jwt.sign(
        {
          id: createdUser._id,
          isAdmin: createdUser.isAdmin,
        },
        process.env.JWT_SEC,
        { expiresIn: "3d" }
      );
      return res.status(200).json({ ...createdUser, token: accessToken });
    }

    res.status(201).json(createdUser);
  } catch (err) {
    res.status(500).json(errorFormatter(err));
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    let newsletter = await Newsletter.find({ email: req.body.email });
    if (newsletter) await Newsletter.deleteOne({ email: req.body.email });

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    const { password, ...others } = updatedUser._doc;

    newsletter = await Newsletter.find({ email: others.email });
    if (req.body.onNewsletter) Newsletter.create({ email: others.email });
    if (req.body.onNewsletter != null && !req.body.onNewsletter)
      Newsletter.deleteOne({ email: others.email })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

    others.onNewsletter = req.body.onNewsletter;
    others.fullName = others.firstName.concat(" ", others.lastName);

    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(errorFormatter(err));
  }
});

//CHANGE PASSWORD
router.put("/chpass/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const originalPassword = CryptoJS.AES.decrypt(
      user._doc.password,
      process.env.PASS_SEC
    ).toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.oldPassword)
      return res.status(500).json("Pogrešna privremena ili stara lozinka!");

    const encryptedNewPassword = CryptoJS.AES.encrypt(
      req.body.newPassword,
      process.env.PASS_SEC
    ).toString();

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: { password: encryptedNewPassword },
      },
      { new: true }
    );

    const { password, ...others } = updatedUser._doc;
    others.fullName = others.firstName.concat(" ", others.lastName);

    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(errorFormatter(err));
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const emails = await Newsletter.find();
    const user = await User.findById(req.params.id);

    const onNewsletter =
      emails.filter((item) => item.email === user.email).length !== 0;

    const { password, ...others } = user._doc;
    others.onNewsletter = onNewsletter;
    others.fullName = others.firstName.concat(" ", others.lastName);

    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/find", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 })
      : await User.find();
    const result = users.map((user) => {
      const { password, ...others } = user._doc;
      return others;
    });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER WITH EMAIL
router.post("/filter", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const { password, ...others } = user._doc;
      return res.status(200).json(others);
    }

    return res.status(400).json("Ne postoji korisnički nalog sa tim email-om.");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET STATS
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const currentMonth = date.getMonth() + 1;
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);

    if (data.length < 13) {
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach((el) => {
        const pom = data.filter((i) => i._id === el).length === 0;
        if (pom) {
          data.push({ _id: el, total: 0 });
        }
      });
    }
    let sortedData = data.sort((a, b) => a._id - b._id);

    if (currentMonth !== 12) {
      let pom = sortedData.filter((el) => el._id > currentMonth);
      let pom2 = sortedData.filter((el) => el._id <= currentMonth);
      sortedData = pom.concat(...pom2);
    }

    res.status(200).json(sortedData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

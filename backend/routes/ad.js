const router = require("express").Router();
const { verifyTokenAndAdmin } = require("./verifyToken");
const Ad = require("../models/Ad");
const multer = require("multer");
const _ = require("lodash");
const imageMimeTypes = ["image/jpeg", "image/png", "images/gif"];
const upload = multer().single("image");
const { errorFormatter } = require("../utils.js");

//CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(500).json(err);

    try {
      const image = req.file || req.body.image;

      if (!(image && (image.buffer || image.data)))
        return res.status(500).json("Slika je obavezna.");

      if (!imageMimeTypes.includes(image.mimetype || image.type))
        return res
          .status(500)
          .json(
            "Poslata slika ima ekstenziju koja nije podržana od nas. Podržane ekstenzije su : jpeg, png, gif"
          );

      const bodyRequest = {
        ...req.body,
        image: image.buffer || new Buffer.from(image.data, "base64"),
        imageType: image.mimetype || image.type,
      };

      const createdAd = await Ad.create(bodyRequest);
      res.status(200).json(createdAd);
    } catch (err) {
      res.status(500).json(errorFormatter(err));
    }
  });
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(500).json(err);

    try {
      let propertyList = req.body;
      const image = req.file || req.body.image;

      if (image && (image.buffer || image.data)) {
        if (!imageMimeTypes.includes(image.mimetype || image.type))
          return res
            .status(500)
            .json(
              "Poslata slika ima ekstenziju koja nije podržana od nas. Podržane ekstenzije su : jpeg, png, gif"
            );

        propertyList = {
          ...propertyList,
          image: image.buffer || new Buffer.from(image.data, "base64"),
          imageType: image.mimetype || image.type,
        };
      } else propertyList = _.omit(propertyList, "image");

      const updatedAd = await Ad.findByIdAndUpdate(
        req.params.id,
        {
          $set: propertyList,
        },
        { new: true }
      );

      res.status(200).json(updatedAd);
    } catch (err) {
      res.status(500).json(errorFormatter(err));
    }
  });
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const deletedAd = await Ad.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedAd);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    res.status(200).json(ad);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/find", async (req, res) => {
  const query = req.query.new;
  try {
    let ads = query ? await Ad.find().sort({ _id: -1 }) : await Ad.find();
    res.status(200).json(ads);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

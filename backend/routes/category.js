const router = require("express").Router();
const { verifyTokenAndAdmin } = require("./verifyToken");
const Category = require("../models/Category");
const multer = require("multer");
const _ = require("lodash");
const imageMimeTypes = ["image/jpeg", "image/png", "images/gif"];
const upload = multer().single("image");
const { errorFormatter } = require("../utils");

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

      if (bodyRequest.multisize && bodyRequest.sizes?.length === 0) {
        return res.status(500).json("Niste unijeli veličine.");
      }

      if (bodyRequest.sizes) {
        bodyRequest.sizes = bodyRequest.sizes.filter(
          (elem, index, self) => index === self.indexOf(elem)
        );
      }

      const createdCategory = await Category.create(bodyRequest);
      res.status(200).json(createdCategory);
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

      if (propertyList.multisize && propertyList.sizes?.length === 0) {
        return res.status(500).json("Niste unijeli veličine.");
      }

      if (propertyList.sizes) {
        propertyList.sizes = propertyList.sizes.filter(
          (elem, index, self) => index === self.indexOf(elem)
        );
      }

      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        {
          $set: propertyList,
        },
        { new: true }
      );
      res.status(200).json(updatedCategory);
    } catch (err) {
      res.status(500).json(errorFormatter(err));
    }
  });
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/find", async (req, res) => {
  const query = req.query.new;
  try {
    const categories = query
      ? await Category.find().sort({ _id: -1 })
      : await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

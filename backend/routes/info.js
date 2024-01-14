const Info = require("../models/Info");
const { verifyTokenAndAdmin } = require("./verifyToken");
const router = require("express").Router();
const { errorFormatter } = require("../utils.js");

//CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const createdInfo = await Info.create(req.body);
    res.status(200).json(createdInfo);
  } catch (err) {
    res.status(500).json(errorFormatter(err));
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    if (req.body.clearLinks) {
      req.body.instagram = "";
      req.body.twitter = "";
      req.body.pinterest = "";
      req.body.facebook = "";
    }
    const updateInfo = await Info.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateInfo);
  } catch (err) {
    res.status(500).json(errorFormatter(err));
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const deletedInfo = await Info.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET
router.get("/find/:id", async (req, res) => {
  try {
    const info = await Info.findById(req.params.id);
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/find", verifyTokenAndAdmin, async (req, res) => {
  try {
    const info = await Info.find();
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

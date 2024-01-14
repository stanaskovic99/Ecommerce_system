const router = require("express").Router();
const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
  verifyToken,
} = require("./verifyToken");
const Newsletter = require("../models/Newsletter");
const { errorFormatter } = require("../utils.js");

//CREATE
router.post("/", async (req, res) => {
  try {
    const createdNewsletter = await Newsletter.create(req.body);
    res.status(200).json(createdNewsletter);
  } catch (err) {
    res.status(500).json(errorFormatter(err));
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedNewsletter = await Newsletter.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedNewsletter);
  } catch (err) {
    res.status(500).json(errorFormatter(err));
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const deletedNewsletter = await Newsletter.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedNewsletter);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/", verifyToken, async (req, res) => {
  try {
    const deletedNewsletter = await Newsletter.findOneAndDelete({
      email: req.body.email,
    });
    res.status(200).json(deletedNewsletter);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const newsletter = await Newsletter.findById(req.params.id);
    res.status(200).json(newsletter._doc);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/find", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const newsletters = query
      ? await Newsletter.find().sort({ _id: -1 })
      : await Newsletter.find();
    res.status(200).json(newsletters);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

const router = require("express").Router();
const { verifyTokenAndAdmin, verifyToken } = require("./verifyToken");
const Status = require("../models/Status");
const { errorFormatter } = require("../utils");

//CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const createdStatus = await Status.create(req.body);
    res.status(200).json(createdStatus);
  } catch (err) {
    res.status(500).json(errorFormatter(err));
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedStatus = await Status.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedStatus);
  } catch (err) {
    res.status(500).json(errorFormatter(err));
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const deletedStatus = await Status.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedStatus);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const status = await Status.findById(req.params.id);
    res.status(200).json(status);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/find", verifyToken, async (req, res) => {
  const query = req.query.new;
  try {
    const statuses = query
      ? await Status.find().sort({ _id: -1 })
      : await Status.find();
    res.status(200).json(statuses);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

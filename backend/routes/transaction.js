const router = require("express").Router();
const { verifyTokenAndAdmin } = require("./verifyToken");
const User = require("../models/User");
const Transaction = require("../models/Transaction");
const { errorFormatter, percentToLastMonth } = require("../utils.js");
const _ = require("lodash");

//CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const body = { ...req.body, username: user.username };

    const createdTransaction = await Transaction.create(body);
    res.status(200).json(createdTransaction);
  } catch (err) {
    console.log(err);
    res.status(500).json(errorFormatter(err));
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updateTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updateTransaction);
  } catch (err) {
    res.status(500).json(errorFormatter(err));
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(
      req.params.id
    );
    res.status(200).json(deletedTransaction);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET TRANSACTION
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    res.status(200).json(transaction);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/find", verifyTokenAndAdmin, async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json(err);
  }
});

//STATS
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  try {
    let stats = {};
    const currentMonth = new Date().getMonth() + 1;
    const lastMonth = new Date().getMonth();
    if (lastMonth === 0) lastMonth = 12;

    //cost
    let data = await Transaction.aggregate([
      {
        $project: {
          month: { $month: "$date" },
          amount: "$amount",
        },
      },
      {
        $match: {
          $and: [
            { amount: { $lt: 0 } },
            {
              $or: [
                { month: { $eq: currentMonth } },
                { month: { $eq: lastMonth } },
              ],
            },
          ],
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$amount" },
        },
      },
    ]);

    stats.costCurrentMonth = data
      .filter((el) => el._id === currentMonth)
      .flatMap((el) => -1 * el.total)
      .find((el) => el);

    stats.costLastMonth = data
      .filter((el) => el._id === lastMonth)
      .flatMap((el) => -1 * el.total)
      .find((el) => el);

    stats.costPercentToLastMonth = percentToLastMonth(
      stats.costLastMonth,
      stats.costCurrentMonth
    );

    //income
    data = await Transaction.aggregate([
      {
        $project: {
          month: { $month: "$date" },
          amount: "$amount",
        },
      },
      {
        $match: {
          $and: [
            { amount: { $gte: 0 } },
            {
              $or: [
                { month: { $eq: currentMonth } },
                { month: { $eq: lastMonth } },
              ],
            },
          ],
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$amount" },
        },
      },
    ]);

    stats.incomeCurrentMonth = data
      .filter((el) => el._id === currentMonth)
      .flatMap((el) => el.total)
      .find((el) => el);

    stats.incomeLastMonth = data
      .filter((el) => el._id === lastMonth)
      .flatMap((el) => el.total)
      .find((el) => el);

    stats.incomePercentToLastMonth = percentToLastMonth(
      stats.incomeLastMonth,
      stats.incomeCurrentMonth
    );

    //state = income and cost together
    data = await Transaction.aggregate([
      {
        $project: {
          month: { $month: "$date" },
          amount: "$amount",
        },
      },
      {
        $match: {
          $or: [
            { month: { $eq: currentMonth } },
            { month: { $eq: lastMonth } },
          ],
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$amount" },
        },
      },
    ]);

    stats.stateCurrentMonth = data
      .filter((el) => el._id === currentMonth)
      .flatMap((el) => el.total)
      .find((el) => el);

    stats.stateLastMonth = data
      .filter((el) => el._id === lastMonth)
      .flatMap((el) => el.total)
      .find((el) => el);

    stats.statePercentToLastMonth = percentToLastMonth(
      stats.stateLastMonth,
      stats.stateCurrentMonth
    );

    res.status(200).json(stats);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

const router = require("express").Router();
const stripe = require("stripe")(
  "sk_test_51LLOjYCu4KRKFNCXuWnhvjOctQNJ43aIQEySac2uSEJBbCi5Uov184go5GVHlhX3P4y08YBXpct1ELwhmRsqZKRQ00LpvZt0vj"
);
const { verifyToken } = require("./verifyToken");
const User = require("../models/User");

//create payment intent
router.post("/create-payment-intent", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "bam",
      automatic_payment_methods: {
        enabled: true,
      },
      receipt_email: user.email,
    });
    res.status(200).json(paymentIntent);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete payment intent
router.post("/delete-payment-intent", verifyToken, async (req, res) => {
  try {
    const response = await stripe.paymentIntents.cancel(
      req.body.paymentIntentId
    );
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

//fetch payment intent
router.get("/fetch-payment-intent/:id", verifyToken, async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(req.params.id);
    res.status(200).json(paymentIntent);
  } catch (err) {
    res.statsu(500).json(err);
  }
});

module.exports = router;

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const articleRoute = require("./routes/article");
const adRoute = require("./routes/ad");
const categoryRoute = require("./routes/category");
const newsletterRoute = require("./routes/newsletter");
const orderRoute = require("./routes/order");
const statusRoute = require("./routes/status");
const stripeRoute = require("./routes/stripe");
const infoRoute = require("./routes/info");
const transactionRoute = require("./routes/transaction");
const cors = require("cors");

dotenv.config();
app.use(cors());
app.use(express.json({ limit: "25mb" }));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => console.log(err));

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/article", articleRoute);
app.use("/api/ad", adRoute);
app.use("/api/category", categoryRoute);
app.use("/api/newsletter", newsletterRoute);
app.use("/api/order", orderRoute);
app.use("/api/status", statusRoute);
app.use("/api/checkout", stripeRoute);
app.use("/api/info", infoRoute);
app.use("/api/transaction", transactionRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server running");
});

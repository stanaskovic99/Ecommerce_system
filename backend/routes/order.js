const router = require("express").Router();
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const Order = require("../models/Order");
const User = require("../models/User");
const Article = require("../models/Article");
const Status = require("../models/Status");
const { mapAddress } = require("../utils");
const { errorFormatter } = require("../utils.js");
const _ = require("lodash");
const Transaction = require("../models/Transaction");

//CREATE --- params id is user id
router.post("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const createdOrder = await Order.create(req.body);
    const user = await User.findById(req.user.id);
    let description = "Narudžba: " + createdOrder._id;
    let date = new Date().toUTCString();
    let body = {
      description: description,
      username: user.username,
      amount: req.body.total,
      date: date,
    };
    await Transaction.create(body);

    createdOrder.articles.forEach(async (item) => {
      const article = await Article.findById(item._idArticle);
      const stock = article.stock.map((el) => {
        if (el.size === item.size) {
          el.amount = el.amount < item.quantity ? 0 : el.amount - item.quantity;
        }
        return el;
      });

      let propertyList = {
        stock: stock,
      };

      await Article.findByIdAndUpdate(
        item._idArticle,
        {
          $set: propertyList,
        },
        { new: true }
      );
    });

    res.status(200).json(createdOrder);
  } catch (err) {
    console.log(err);
    res.status(500).json(errorFormatter(err));
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (req.body.total) {
      const updateTransaction = await Transaction.findOneAndUpdate(
        { description: { $eq: "Order: " + req.params.id } },
        {
          $set: {
            amount: req.body.total,
          },
        },
        { new: true }
      );
    }

    let statusName = (await Status.find()).find(
      (s) => s._id.toString() === updatedOrder._doc.status.toString()
    ).name;
    updatedOrder._doc.status = statusName;

    const articles = await Article.find();
    updatedOrder._doc.articles.forEach((element) => {
      const articleId = articles.find(
        (a) => a._id.toString() === element._idArticle.toString()
      ).articleId;
      element._doc.articleId = articleId;
      _.omit(element, "_idArticle");
      return element;
    });

    let pom = "";
    if (updatedOrder._doc.address != null) {
      pom = mapAddress(updatedOrder._doc.address);
    }
    const result = { ...updatedOrder._doc, address: pom };

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(errorFormatter(err));
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ORDER
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const articles = await Article.find();
    const statuses = await Status.find();
    const order = await Order.findById(req.params.id);

    const orderArticles = order._doc.articles.map((element) => {
      let articleId = articles.find(
        (a) => a._id.toString() === element._idArticle.toString()
      ).articleId;
      const pom = {
        quantity: element.quantity,
        size: element.size,
        articleId: articleId,
      };
      return pom;
    });

    const orderStatus = statuses.find(
      (s) => s._id.toString() === order._doc.status.toString()
    ).name;

    let orderAddress = "";
    if (order._doc.address != null) {
      orderAddress = mapAddress(order._doc.address);
    }

    const result = {
      ...order._doc,
      address: orderAddress,
      status: orderStatus,
      articles: orderArticles,
    };

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//FILTER USER ORDERS
router.get("/filter/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const articles = await Article.find();
    const statuses = await Status.find();
    let user = await User.findById(req.params.userId);
    let orders = await Order.find({ email: user.email });

    orders.forEach((item) => {
      item._doc.articles.forEach((element) => {
        const articleId = articles.find(
          (a) => a._id.toString() === element._idArticle.toString()
        ).articleId;
        element._doc.articleId = articleId;
        _.omit(element, "_idArticle");
        return element;
      });

      let statusName = statuses.find(
        (s) => s._id.toString() === item._doc.status.toString()
      ).name;
      item._doc.status = statusName;

      let pom = "";
      if (item._doc.address != null) {
        pom = mapAddress(item._doc.address);
      }
      item._doc.address = pom;

      return pom;
    });
    res.status(200).json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/find", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    const articles = await Article.find();
    const statuses = await Status.find();

    orders.forEach((item) => {
      let statusName = statuses.find(
        (s) => s._id.toString() === item._doc.status.toString()
      ).name;
      item._doc.status = statusName;

      item._doc.articles.forEach((element) => {
        const articleId = articles.find(
          (a) => a._id.toString() === element._idArticle.toString()
        ).articleId;
        element._doc.articleId = articleId;
        _.omit(element, "_idArticle");
        return element;
      });

      let pom = "";
      if (item._doc.address != null) {
        pom = mapAddress(item._doc.address);
      }
      item._doc.address = pom;

      return pom;
    });

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

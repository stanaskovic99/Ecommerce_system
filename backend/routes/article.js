const router = require("express").Router();
const { verifyTokenAndAdmin, verifyToken } = require("./verifyToken");
const Article = require("../models/Article");
const Category = require("../models/Category");
const multer = require("multer");
const _ = require("lodash");
const imageMimeTypes = ["image/jpeg", "image/png", "images/gif"];
const upload = multer().array("images", 5);
const { errorFormatter } = require("../utils");

//CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(500).json(err);

    try {
      let images = req.files || req.body.images;

      const allImagesHaveData =
        images?.filter((el) => el.data)?.length === images?.length;
      const allImagesHaveBuffer =
        images?.filter((el) => el.buffer)?.length === images?.length;

      if (
        !(
          images &&
          images.length != 0 &&
          (allImagesHaveData || allImagesHaveBuffer)
        )
      )
        return res.status(500).json("Obavezna je minimalno jedna slika.");

      const existsImagesWithUnsupportedExtensions =
        images
          .map((el) => imageMimeTypes.includes(el.mimetype || el.type))
          .filter((el) => el === false).length !== 0;

      if (existsImagesWithUnsupportedExtensions) {
        return res
          .status(500)
          .json(
            "Poslata/e slika/e ima/imaju ekstenziju koja nije podržana od nas. Podržane ekstenzije su : jpeg, png, gif"
          );
      }

      const existMainImage =
        images
          .map((el) =>
            req.files ? el.originalname === req.body.mainImage : el.isMainImage
          )
          .filter((el) => el).length !== 0;
      if (!existMainImage) {
        return res.status(500).json("Glavna slika je obavezna.");
      }

      images = images.map((el) => {
        return {
          image: el.buffer || new Buffer.from(el.data, "base64"),
          imageType: el.mimetype || el.type,
          isMainImage: req.files
            ? el.originalname === req.body.mainImage
            : el.isMainImage,
        };
      });

      if (req.files) {
        _.omit(req.body, "mainImage");
      }

      const bodyRequest = { ...req.body, images: images };
      const createdArticle = await Article.create(bodyRequest);

      const articleImagesSrc = createdArticle._doc.images.map((el) => {
        return {
          srcImage: createdArticle.getSrcImage(el),
          isMainImage: el.isMainImage,
          type: el.imageType,
          data: el.image.toString("base64"),
        };
      });

      const categoryName = (await Category.find()).filter((c) => {
        return c._id.toString() === createdArticle._doc.category.toString();
      })[0].name;

      const result = {
        ...createdArticle._doc,
        images: articleImagesSrc,
        category: categoryName,
      };

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(errorFormatter(err));
    }
  });
});

//UPDATE
router.put("/:id", verifyToken, async (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(500).json(err);

    try {
      let propertyList = req.body;
      let images = req.files || req.body.images;

      const allImagesHaveData =
        images?.filter((el) => el.data)?.length === images?.length;
      const allImagesHaveBuffer =
        images?.filter((el) => el.buffer)?.length === images?.length;

      if (
        images &&
        images.length != 0 &&
        (allImagesHaveData || allImagesHaveBuffer)
      ) {
        const existsImagesWithUnsupportedExtensions =
          images
            .map((el) => imageMimeTypes.includes(el.mimetype || el.type))
            .filter((el) => el === false).length !== 0;

        if (existsImagesWithUnsupportedExtensions) {
          return res
            .status(500)
            .json(
              "Poslata/e slika/e ima/imaju ekstenziju koja nije podržana od nas. Podržane ekstenzije su : jpeg, png, gif"
            );
        }

        const article = await Article.findById(req.params.id);
        const notSentMainImage =
          images
            .map((el) =>
              req.files
                ? el.originalname === req.body.mainImage
                : el.isMainImage
            )
            .filter((el) => el).length === 0;
        const notSentOtherImages =
          images
            .map((el) =>
              req.files
                ? el.originalname === req.body.mainImage
                : el.isMainImage
            )
            .filter((el) => !el).length === 0;

        images = images.map((el) => {
          return {
            image: el.buffer || new Buffer.from(el.data, "base64"),
            imageType: el.mimetype || el.type,
            isMainImage: req.files
              ? el.originalname === req.body.mainImage
              : el.isMainImage,
          };
        });

        if (notSentMainImage && !notSentOtherImages) {
          const mainImage = article.images.filter(
            (el) => el.isMainImage === true
          );
          images = [...images, ...mainImage];
        } else if (!notSentMainImage && notSentOtherImages) {
          const otherImages = !req.body.deleteOtherImages
            ? article.images.filter((el) => el.isMainImage === false)
            : [];

          images = [...images, ...otherImages];
        }

        propertyList.images = images;
      } else if (req.body.deleteOtherImages) {
        const article = await Article.findById(req.params.id);
        const mainImage = article.images.filter(
          (el) => el.isMainImage === true
        );
        propertyList.images = mainImage;
      }

      const updatedArticle = await Article.findByIdAndUpdate(
        req.params.id,
        {
          $set: propertyList,
        },
        { new: true }
      );

      const articleImagesSrc = updatedArticle._doc.images.map((el) => {
        return {
          srcImage: updatedArticle.getSrcImage(el),
          isMainImage: el.isMainImage,
          type: el.imageType,
          data: el.image?.toString("base64"),
        };
      });

      const categoryName = (await Category.find()).filter((c) => {
        return c._id.toString() === updatedArticle._doc.category.toString();
      })[0].name;

      const result = {
        ...updatedArticle._doc,
        images: articleImagesSrc,
        category: categoryName,
      };
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const deletedArticle = await Article.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedArticle);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET
router.get("/find/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    const articleImagesSrc = article._doc.images.map((el) => {
      return {
        srcImage: article.getSrcImage(el),
        isMainImage: el.isMainImage,
        type: el.imageType,
        data: el.image.toString("base64"),
      };
    });

    const categoryName = (await Category.find()).filter((c) => {
      return c._id.toString() === article._doc.category.toString();
    })[0].name;

    const result = {
      ...article._doc,
      images: articleImagesSrc,
      category: categoryName,
    };

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET BRANDS
router.get("/brands", async (req, res) => {
  try {
    const articles = await Article.find();
    const brands = articles.flatMap((article) => article.brand);
    var filteredBrands = brands.filter(function (elem, index, self) {
      return index === self.indexOf(elem);
    });

    res.status(200).json(filteredBrands);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/find", async (req, res) => {
  try {
    let articles = await Article.find();
    const categories = await Category.find();

    articles.forEach((article) => {
      article._doc.images = article.images.map((el) => {
        return {
          srcImage: article.getSrcImage(el),
          isMainImage: el.isMainImage,
          type: el.imageType,
          data: el.image.toString("base64"),
        };
      });
      article._doc.category = categories.filter((c) => {
        return c._id.toString() === article.category.toString();
      })[0].name;
    });

    if (!req.body.everything) {
      articles = articles.filter((item) => {
        return (
          item.stock.map((el) => el.amount).filter((el) => el > 0).length !== 0
        );
      });
    }

    res.status(200).json(articles);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/sizes", async (req, res) => {
  try {
    const article = await Article.find();
    let sizes = [];
    article.forEach((item) => {
      const articleSizes = item.stock
        .filter((el) => el.amount > 0)
        .map((el) => el.size);
      articleSizes.forEach((el) => {
        if (!sizes.includes(el) && el !== "unisize") sizes.push(el);
      });
    });

    sizes = sizes.sort((a, b) => a - b);
    res.status(200).json(sizes);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL, GET WITH SEARCH, GET WITH FILTER, GET WITH SEARCH AND FILTER
router.get("/filter", async (req, res) => {
  const query_search = req.query.search;
  const query_sorting = req.query.sorting;
  const query_category = req.query.category;
  const query_home = req.query.home;
  const query_brand = req.query.brand;
  const query_size = req.query.size;
  let query = {};
  if (
    query_category ||
    query_home ||
    query_brand ||
    query_size ||
    query_search
  ) {
    query = {
      $and: [],
    };
  }

  try {
    if (query_search) {
      let little_query = { $or: [] };
      const category = await Category.find({ name: { $regex: query_search } });
      if (Object.keys(category).length !== 0) {
        little_query.$or.push({ category: category[0]._id });
      }

      little_query.$or.push(
        { articleId: { $regex: query_search } },
        { brand: { $regex: query_search } },
        { description: { $regex: query_search } }
      );

      query.$and.push(little_query);
    }

    if (query_category) {
      const category = await Category.find({
        name: { $regex: query_category },
      });
      if (Object.keys(category).length !== 0) {
        query.$and.push({ category: category[0]._id });
      }
    }

    if (query_brand) {
      query.$and.push({
        brand: { $regex: query_brand },
      });
    }

    if (query_size) {
      query.$and.push({
        stock: { $elemMatch: { size: query_size, amount: { $gt: 0 } } },
      });
    }

    if (query_home) {
      query.$and.push({
        shownAtHomePage: true,
      });
    }

    let articles = [];

    if (query_sorting) {
      switch (query_sorting) {
        case "lower_price": {
          articles = await Article.find(query).sort({ price: 1 });
          break;
        }
        case "bigger_price": {
          articles = await Article.find(query).sort({ price: -1 });
          break;
        }
      }
    } else if (Object.entries(query).length === 0 || query.$and.length === 0) {
      articles = await Article.find().sort({ createdAt: -1 });
    } else {
      articles = await Article.find(query).sort({ createdAt: -1 });
    }

    if (!req.body.everything) {
      articles = articles.filter((item) => {
        return (
          item.stock.map((el) => el.amount).filter((el) => el > 0).length !== 0
        );
      });
    }

    const categories = await Category.find();
    articles.forEach((article) => {
      article._doc.images = article.images.map((el) => {
        return {
          srcImage: article.getSrcImage(el),
          isMainImage: el.isMainImage,
          type: el.imageType,
          data: el.image.toString("base64"),
        };
      });

      article._doc.category = categories.filter((c) => {
        return c._id.toString() === article.category.toString();
      })[0].name;
    });

    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

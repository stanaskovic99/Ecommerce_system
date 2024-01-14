import {
  ERROR_MESSAGE,
  FETCH_ARTICLES,
  NO_MESSAGE,
  UPDATE_ARTICLE,
  DELETE_ARTICLE,
  FETCH_ARTICLE,
  CREATE_ARTICLE,
} from "./types";
import { article } from "../utils/toBackend";
import { setTokenHeader } from "../utils/helper";

export const fetchArticles = () => async (dispatch) => {
  setTokenHeader(article);
  dispatch({ type: NO_MESSAGE });

  article
    .get("/find", { everything: true })
    .then((response) => {
      dispatch({ type: FETCH_ARTICLES, payload: response.data });
    })
    .catch((err) => {
      console.error(err);
      if (err.response?.status === 401) {
        window.location.href = "/";
      } else {
        dispatch({
          type: ERROR_MESSAGE,
          payload: err.response.data,
        });
      }
    });
};

export const fetchArticle = (id) => async (dispatch) => {
  setTokenHeader(article);
  dispatch({ type: NO_MESSAGE });

  article
    .get(`/find/${id}`)
    .then((response) => {
      dispatch({ type: FETCH_ARTICLE, payload: response.data });
    })
    .catch((err) => {
      console.error(err);
      if (err.response?.status === 401) {
        window.location.href = "/";
      } else {
        dispatch({
          type: ERROR_MESSAGE,
          payload: err.response.data,
        });
      }
    });
};

export const createArticle =
  (
    articleId,
    brand,
    category,
    description,
    price,
    priceWithoutDiscount,
    shownAtHomePage,
    images,
    stock
  ) =>
  async (dispatch) => {
    setTokenHeader(article);
    dispatch({
      type: NO_MESSAGE,
    });

    let bodyRequest = {};
    let errorMessage = "";
    if (articleId && articleId !== "") {
      bodyRequest.articleId = articleId;
    }
    if (brand && brand !== "") {
      bodyRequest.brand = brand;
    }
    if (category && category !== "") {
      bodyRequest.category = category;
    }
    if (description && description !== "") {
      bodyRequest.description = description;
    }
    if (shownAtHomePage != null) {
      bodyRequest.shownAtHomePage = shownAtHomePage;
    }
    if (images && images.length !== 0) {
      bodyRequest.images = images;
    }
    if (stock && stock.length !== 0) {
      bodyRequest.stock = stock;
    }
    if (price && price !== "") {
      if (!isNaN(price)) {
        bodyRequest.price = price.trim();
      } else {
        errorMessage += "Cijena mora biti broj. ";
      }
    }
    if (priceWithoutDiscount && priceWithoutDiscount !== "") {
      if (!isNaN(priceWithoutDiscount)) {
        bodyRequest.priceWithoutDiscount = priceWithoutDiscount.trim();
      } else {
        errorMessage += "Cijena bez popusta mora biti broj.";
      }
    }

    if (errorMessage !== "") {
      dispatch({
        type: ERROR_MESSAGE,
        payload: errorMessage,
      });
    } else {
      article
        .post("/", bodyRequest)
        .then((response) => {
          dispatch({ type: CREATE_ARTICLE, payload: response.data });
          window.location.href = "/articles";
        })
        .catch((err) => {
          console.error(err);
          if (err.response?.status === 401) {
            window.location.href = "/";
          } else {
            dispatch({
              type: ERROR_MESSAGE,
              payload: err.response.data,
            });
          }
        });
    }
  };

export const updateArticle =
  (
    id,
    articleId,
    brand,
    category,
    description,
    price,
    priceWithoutDiscount,
    shownAtHomePage,
    images,
    deleteOtherImages,
    stock
  ) =>
  async (dispatch) => {
    setTokenHeader(article);
    dispatch({ type: NO_MESSAGE });

    let bodyRequest = {};
    let errorMessage = "";
    if (articleId && articleId !== "") {
      bodyRequest.articleId = articleId;
    }
    if (brand && brand !== "") {
      bodyRequest.brand = brand;
    }
    if (category && category !== "") {
      bodyRequest.category = category;
    }
    if (description && description !== "") {
      bodyRequest.description = description;
    }
    if (shownAtHomePage != null) {
      bodyRequest.shownAtHomePage = shownAtHomePage;
    }
    if (images && images.length !== 0) {
      bodyRequest.images = images;
    }
    if (stock && stock.length !== 0) {
      bodyRequest.stock = stock;
    }
    if (deleteOtherImages != null) {
      bodyRequest.deleteOtherImages = deleteOtherImages;
    }
    if (price && price !== "") {
      if (!isNaN(parseFloat(price))) {
        bodyRequest.price = price;
      } else {
        errorMessage += "Cijena mora biti broj.";
      }
    }
    if (priceWithoutDiscount && priceWithoutDiscount !== "") {
      if (!isNaN(parseFloat(priceWithoutDiscount))) {
        bodyRequest.priceWithoutDiscount = priceWithoutDiscount;
      } else {
        errorMessage += "Cijena bez popusta mora biti broj.";
      }
    }

    if (errorMessage !== "") {
      dispatch({
        type: ERROR_MESSAGE,
        payload: errorMessage,
      });
    } else {
      article
        .put(`/${id}`, bodyRequest)
        .then((response) => {
          dispatch({ type: UPDATE_ARTICLE, payload: response.data });
        })
        .catch((err) => {
          console.error(err);
          if (err.response?.status === 401) {
            window.location.href = "/";
          } else {
            dispatch({
              type: ERROR_MESSAGE,
              payload: err.response.data,
            });
          }
        });
    }
  };

export const deleteArticle = (id) => async (dispatch) => {
  setTokenHeader(article);
  dispatch({ type: NO_MESSAGE });

  article
    .delete(`/${id}`)
    .then((response) => {
      dispatch({ type: DELETE_ARTICLE, payload: response.data });
    })
    .catch((err) => {
      console.error(err);
      if (err.response?.status === 401) {
        window.location.href = "/";
      } else {
        dispatch({
          type: ERROR_MESSAGE,
          payload: err.response.data,
        });
      }
    });
};

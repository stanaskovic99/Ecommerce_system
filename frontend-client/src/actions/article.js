import { setTokenHeader } from "../utils/helper";
import { article } from "../utils/toBackend";
import {
  ERROR_MESSAGE,
  NO_MESSAGE,
  FETCH_ARTICLES,
  FETCH_ARTICLE,
  FETCH_BRANDS,
  FETCH_SIZES,
} from "./types";

export const fetchArticles =
  (filters = {}) =>
  async (dispatch) => {
    dispatch({ type: NO_MESSAGE });

    if (Object.keys(filters).length !== 0) {
      article
        .get("/filter", { params: filters })
        .then((response) =>
          dispatch({ type: FETCH_ARTICLES, payload: response.data })
        )
        .catch((err) => {
          console.error(err);
          dispatch({ type: ERROR_MESSAGE, payload: err });
        });
    } else {
      article
        .get("/find")
        .then((response) =>
          dispatch({ type: FETCH_ARTICLES, payload: response.data })
        )
        .catch((err) => {
          console.error(err);
          dispatch({ type: ERROR_MESSAGE, payload: err });
        });
    }
  };

export const fetchBrands = () => async (dispatch) => {
  dispatch({ type: NO_MESSAGE });
  article
    .get("/brands")
    .then((response) =>
      dispatch({ type: FETCH_BRANDS, payload: response.data })
    )
    .catch((err) => {
      console.error(err);
      dispatch({ type: ERROR_MESSAGE, payload: err });
    });
};

export const fetchSizes = () => async (dispatch) => {
  dispatch({ type: NO_MESSAGE });
  article
    .get("/sizes")
    .then((response) => dispatch({ type: FETCH_SIZES, payload: response.data }))
    .catch((err) => {
      console.error(err);
      dispatch({ type: ERROR_MESSAGE, payload: err });
    });
};

export const fetchArticle = (id) => async (dispatch) => {
  dispatch({ type: NO_MESSAGE });
  article
    .get(`/find/${id}`)
    .then((response) =>
      dispatch({ type: FETCH_ARTICLE, payload: response.data })
    )
    .catch((err) => {
      console.error(err);
      dispatch({ type: ERROR_MESSAGE, payload: err });
    });
};

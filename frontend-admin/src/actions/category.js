import {
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  ERROR_MESSAGE,
  FETCH_CATEGORIES,
  FETCH_CATEGORY,
  NO_MESSAGE,
  UPDATE_CATEGORY,
} from "./types";
import { category } from "../utils/toBackend";
import { setTokenHeader } from "../utils/helper";

export const fetchCategories = () => async (dispatch) => {
  setTokenHeader(category);
  dispatch({ type: NO_MESSAGE });

  category
    .get("/find")
    .then((response) => {
      dispatch({ type: FETCH_CATEGORIES, payload: response.data });
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

export const fetchCategory = (id) => async (dispatch) => {
  setTokenHeader(category);
  dispatch({ type: NO_MESSAGE });

  category
    .get(`/find/${id}`)
    .then((response) => {
      dispatch({ type: FETCH_CATEGORY, payload: response.data });
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

export const createCategory =
  (name, multisize, image, sizes) => async (dispatch) => {
    setTokenHeader(category);
    dispatch({
      type: NO_MESSAGE,
    });

    let bodyRequest = {};
    if (name && name !== "") {
      bodyRequest.name = name;
    }
    if (multisize != null) {
      bodyRequest.multisize = multisize;
    }
    if (image) {
      bodyRequest.image = image;
    }
    if (sizes) {
      bodyRequest.sizes = sizes;
    }

    category
      .post("/", bodyRequest)
      .then((response) => {
        dispatch({ type: CREATE_CATEGORY, payload: response.data });
        window.location.href = "/categories";
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

export const updateCategory =
  (id, name, multisize, image, sizes) => async (dispatch) => {
    setTokenHeader(category);
    dispatch({ type: NO_MESSAGE });

    let bodyRequest = {};
    if (name && name !== "") {
      bodyRequest.name = name;
    }
    if (multisize != null) {
      bodyRequest.multisize = multisize;
    }
    if (image) {
      bodyRequest.image = image;
    }
    if (sizes) {
      bodyRequest.sizes = sizes;
    }

    category
      .put(`/${id}`, bodyRequest)
      .then((response) => {
        dispatch({ type: UPDATE_CATEGORY, payload: response.data });
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

export const deleteCategory = (id) => async (dispatch) => {
  setTokenHeader(category);
  dispatch({ type: NO_MESSAGE });

  category
    .delete(`/${id}`)
    .then((response) => {
      dispatch({ type: DELETE_CATEGORY, payload: response.data });
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

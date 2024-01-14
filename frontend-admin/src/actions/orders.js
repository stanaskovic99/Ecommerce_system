import {
  ERROR_MESSAGE,
  UPDATE_ORDER,
  NO_MESSAGE,
  FETCH_ORDERS,
  FETCH_ORDER,
} from "./types";
import { order } from "../utils/toBackend";
import { setTokenHeader } from "../utils/helper";

export const fetchOrders = () => async (dispatch) => {
  setTokenHeader(order);
  dispatch({ type: NO_MESSAGE });

  order
    .get("/find")
    .then((response) => {
      dispatch({ type: FETCH_ORDERS, payload: response.data });
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

export const fetchOrder = (id) => async (dispatch) => {
  setTokenHeader(order);
  dispatch({ type: NO_MESSAGE });

  order
    .get("/find/" + id)
    .then((response) => {
      dispatch({ type: FETCH_ORDER, payload: response.data });
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

export const updateOrder = (id, status) => async (dispatch) => {
  setTokenHeader(order);
  dispatch({ type: NO_MESSAGE });

  let bodyRequest = {};
  if (status && status !== "") {
    bodyRequest.status = status;
  }

  order
    .put(`/${id}`, bodyRequest)
    .then((response) => {
      dispatch({ type: UPDATE_ORDER, payload: response.data });
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

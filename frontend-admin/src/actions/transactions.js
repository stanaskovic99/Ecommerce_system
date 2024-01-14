import {
  CREATE_TRANSACTION,
  DELETE_TRANSACTION,
  ERROR_MESSAGE,
  FETCH_TRANSACTIONS,
  FETCH_TRANSACTION,
  NO_MESSAGE,
  UPDATE_TRANSACTION,
  FETCH_TRANSACTION_STATISTICS,
} from "./types";
import { transaction } from "../utils/toBackend";
import { setTokenHeader } from "../utils/helper";

export const fetchTransactions = () => async (dispatch) => {
  setTokenHeader(transaction);
  dispatch({ type: NO_MESSAGE });

  transaction
    .get("/find")
    .then((response) => {
      dispatch({ type: FETCH_TRANSACTIONS, payload: response.data });
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

export const fetchTransaction = (id) => async (dispatch) => {
  setTokenHeader(transaction);
  dispatch({ type: NO_MESSAGE });

  transaction
    .get(`/find/${id}`)
    .then((response) => {
      dispatch({ type: FETCH_TRANSACTION, payload: response.data });
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

export const createTransaction =
  (description, amount, date) => async (dispatch) => {
    setTokenHeader(transaction);
    dispatch({
      type: NO_MESSAGE,
    });

    let bodyRequest = {};
    let errorMessage = "";
    if (description && description !== "") {
      bodyRequest.description = description;
    }
    if (amount && amount !== "") {
      if (!isNaN(amount)) {
        bodyRequest.amount = amount;
      } else {
        errorMessage += "Total mora biti broj. ";
      }
    }
    if (date) {
      bodyRequest.date = date;
    }

    if (errorMessage !== "") {
      dispatch({
        type: ERROR_MESSAGE,
        payload: errorMessage,
      });
    } else {
      transaction
        .post("/", bodyRequest)
        .then((response) => {
          dispatch({ type: CREATE_TRANSACTION, payload: response.data });
          window.location.href = "/transactions";
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

export const updateTransaction =
  (id, description, amount, date) => async (dispatch) => {
    setTokenHeader(transaction);
    dispatch({ type: NO_MESSAGE });

    let bodyRequest = {};
    let errorMessage = "";
    if (description && description !== "") {
      bodyRequest.description = description;
    }
    if (amount && amount !== "") {
      if (!isNaN(amount)) {
        bodyRequest.amount = amount.trim();
      } else {
        errorMessage += "Total mora biti broj. ";
      }
    }
    if (date) {
      bodyRequest.date = date;
    }

    if (errorMessage !== "") {
      dispatch({
        type: ERROR_MESSAGE,
        payload: errorMessage,
      });
    } else {
      transaction
        .put(`/${id}`, bodyRequest)
        .then((response) => {
          dispatch({ type: UPDATE_TRANSACTION, payload: response.data });
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

export const deleteTransaction = (id) => async (dispatch) => {
  setTokenHeader(transaction);
  dispatch({ type: NO_MESSAGE });

  transaction
    .delete(`/${id}`)
    .then((response) => {
      dispatch({ type: DELETE_TRANSACTION, payload: response.data });
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

export const fetchTransactionStatistics = () => async (dispatch) => {
  setTokenHeader(transaction);
  dispatch({ type: NO_MESSAGE });

  transaction
    .get("/stats")
    .then((response) => {
      dispatch({ type: FETCH_TRANSACTION_STATISTICS, payload: response.data });
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

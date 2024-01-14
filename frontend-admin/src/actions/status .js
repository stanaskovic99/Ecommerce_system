import {
  FETCH_STATUSES,
  FETCH_STATUS,
  ERROR_MESSAGE,
  DELETE_STATUS,
  UPDATE_STATUS,
  NO_MESSAGE,
  CREATE_STATUS,
} from "./types";
import { status } from "../utils/toBackend";
import { setTokenHeader } from "../utils/helper";
import _ from "lodash";

export const fetchStatuses = () => async (dispatch) => {
  setTokenHeader(status);
  dispatch({ type: NO_MESSAGE });

  status
    .get("/find")
    .then((response) => {
      dispatch({ type: FETCH_STATUSES, payload: response.data });
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

export const fetchStatus = (id) => async (dispatch) => {
  setTokenHeader(status);
  dispatch({ type: NO_MESSAGE });

  status
    .get(`/find/${id}`)
    .then((response) => {
      dispatch({ type: FETCH_STATUS, payload: response.data });
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

export const createStatus = (name, color) => async (dispatch) => {
  setTokenHeader(status);
  dispatch({ type: NO_MESSAGE });

  let bodyRequest = {};
  if (name && name !== "") {
    bodyRequest.name = name;
  }
  if (color && color !== "") {
    bodyRequest.color = color;
  }

  status
    .post("/", bodyRequest)
    .then((response) => {
      dispatch({ type: CREATE_STATUS, payload: response.data });
      window.location.href = "/statuses";
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

export const updateStatus = (id, name, color) => async (dispatch) => {
  setTokenHeader(status);
  dispatch({ type: NO_MESSAGE });

  let bodyRequest = {};
  if (name && name !== "") {
    bodyRequest.name = name;
  }
  if (color && color !== "") {
    bodyRequest.color = color;
  }

  status
    .put(`/${id}`, bodyRequest)
    .then((response) => {
      dispatch({ type: UPDATE_STATUS, payload: response.data });
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

export const deleteStatus = (id) => async (dispatch) => {
  setTokenHeader(status);
  dispatch({ type: NO_MESSAGE });

  status
    .delete(`/${id}`)
    .then((response) => {
      dispatch({ type: DELETE_STATUS, payload: response.data });
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

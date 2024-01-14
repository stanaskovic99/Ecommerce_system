import {
  ERROR_MESSAGE,
  FETCH_ADS,
  NO_MESSAGE,
  UPDATE_AD,
  DELETE_AD,
  FETCH_AD,
  CREATE_AD,
} from "./types";
import { ad } from "../utils/toBackend";
import { setTokenHeader } from "../utils/helper";

export const fetchAds = () => async (dispatch) => {
  setTokenHeader(ad);
  dispatch({ type: NO_MESSAGE });

  ad.get("/find")
    .then((response) => {
      dispatch({ type: FETCH_ADS, payload: response.data });
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

export const fetchAd = (id) => async (dispatch) => {
  setTokenHeader(ad);
  dispatch({ type: NO_MESSAGE });

  ad.get(`/find/${id}`)
    .then((response) => {
      dispatch({ type: FETCH_AD, payload: response.data });
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

export const createAd = (title, description, image) => async (dispatch) => {
  setTokenHeader(ad);
  dispatch({
    type: NO_MESSAGE,
  });

  let bodyRequest = {};
  if (title && title !== "") {
    bodyRequest.title = title;
  }
  if (description && description !== "") {
    bodyRequest.description = description;
  }
  if (image) {
    bodyRequest.image = image;
  }

  ad.post("/", bodyRequest)
    .then((response) => {
      dispatch({ type: CREATE_AD, payload: response.data });
      window.location.href = "/ads";
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

export const updateAd = (id, title, description, image) => async (dispatch) => {
  setTokenHeader(ad);
  dispatch({ type: NO_MESSAGE });

  let bodyRequest = {};
  if (title && title !== "") {
    bodyRequest.title = title;
  }
  if (description && description !== "") {
    bodyRequest.description = description;
  }
  if (image) {
    bodyRequest.image = image;
  }

  // const filteredFormDataEntries = Object.entries(formData)
  //   .map(([k, v]) => {
  //     if (v === "") {
  //       return undefined;
  //     } else {
  //       return [k, v];
  //     }
  //   })
  //   .filter((el) => el !== undefined);
  // const filteredFormDataObject = Object.fromEntries(filteredFormDataEntries);

  ad.put(`/${id}`, bodyRequest)
    .then((response) => {
      dispatch({ type: UPDATE_AD, payload: response.data });
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

export const deleteAd = (id) => async (dispatch) => {
  setTokenHeader(ad);
  dispatch({ type: NO_MESSAGE });

  ad.delete(`/${id}`)
    .then((response) => {
      dispatch({ type: DELETE_AD, payload: response.data });
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

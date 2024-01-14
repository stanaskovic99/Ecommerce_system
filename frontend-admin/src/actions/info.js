import { setTokenHeader } from "../utils/helper";
import { info } from "../utils/toBackend";
import { ERROR_MESSAGE, FETCH_INFO, NO_MESSAGE, UPDATE_INFO } from "./types";

export const fetchInfo = (id) => async (dispatch) => {
  setTokenHeader(info);
  dispatch({ type: NO_MESSAGE });

  info
    .get(`/find/${id}`)
    .then((response) => {
      dispatch({ type: FETCH_INFO, payload: response.data });
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

export const updateInfo =
  (
    id,
    address,
    moNumbers,
    email,
    workingHours,
    instagram,
    twitter,
    pinterest,
    facebook,
    delivery,
    clearLinks
  ) =>
  async (dispatch) => {
    setTokenHeader(info);
    dispatch({ type: NO_MESSAGE });

    console.log(
      id,
      address,
      moNumbers,
      email,
      workingHours,
      instagram,
      twitter,
      pinterest,
      facebook,
      delivery,
      clearLinks
    );

    let bodyRequest = {};
    let errorMessage = "";
    if (address && address !== "") {
      bodyRequest.address = address;
    }
    if (clearLinks) bodyRequest.clearLinks = clearLinks;
    if (moNumbers && moNumbers !== "") {
      bodyRequest.moNumbers = moNumbers;
    }
    if (email && email !== "") {
      bodyRequest.email = email;
    }
    if (workingHours && workingHours !== "") {
      bodyRequest.workingHours = workingHours;
    }
    if (instagram && instagram !== "") {
      bodyRequest.instagram = instagram;
    }
    if (twitter && twitter !== "") {
      bodyRequest.twitter = twitter;
    }
    if (pinterest && pinterest !== "") {
      bodyRequest.pinterest = pinterest;
    }
    if (facebook && facebook !== "") {
      bodyRequest.facebook = facebook;
    }
    if (delivery && !isNaN(delivery)) {
      bodyRequest.delivery = delivery;
    } else if (delivery !== "") {
      errorMessage += "Cijena dostave mora biti broj.";
    }

    if (errorMessage != "") {
      dispatch({ type: ERROR_MESSAGE, payload: errorMessage });
    } else {
      info
        .put(`/${id}`, bodyRequest)
        .then((response) => {
          dispatch({ type: UPDATE_INFO, payload: response.data });
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

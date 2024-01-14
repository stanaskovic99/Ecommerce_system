import emailjs from "@emailjs/browser";
import { setTokenHeader } from "../utils/helper";
import { newsletter } from "../utils/toBackend";
import {
  ADD_TO_NEWSLETTER,
  ERROR_MESSAGE,
  FETCH_NEWSLETTER_EMAILS,
  NO_MESSAGE,
  REMOVE_FROM_NEWSLETTER,
  SUCCESS_MESSAGE,
  UPDATE_EMAIL_IN_NEWSLETTER,
} from "./types";

export const fetchNewsletterEmails = () => async (dispatch) => {
  setTokenHeader(newsletter);
  dispatch({ type: NO_MESSAGE });

  newsletter
    .get("/find")
    .then((response) => {
      dispatch({ type: FETCH_NEWSLETTER_EMAILS, payload: response.data });
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

export const addEmailToNewsletter =
  (email, redirectPage) => async (dispatch) => {
    setTokenHeader(newsletter);
    dispatch({
      type: NO_MESSAGE,
    });

    let bodyRequest = {};
    if (email && email !== "") {
      bodyRequest.email = email;
    }

    newsletter
      .post("/", bodyRequest)
      .then((response) => {
        dispatch({ type: ADD_TO_NEWSLETTER, payload: response.data });
        window.location.href = redirectPage;
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

export const updateNewsletter = (id, email) => async (dispatch) => {
  setTokenHeader(newsletter);
  dispatch({ type: NO_MESSAGE });

  let bodyRequest = {};
  if (email && email !== "") {
    bodyRequest.email = email;
  }

  newsletter
    .put(`/${id}`, bodyRequest)
    .then((response) => {
      dispatch({ type: UPDATE_EMAIL_IN_NEWSLETTER, payload: response.data });
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

export const deleteNewsletterWithId = (id) => async (dispatch) => {
  setTokenHeader(newsletter);
  dispatch({ type: NO_MESSAGE });

  newsletter
    .delete(`/${id}`)
    .then((response) => {
      dispatch({ type: REMOVE_FROM_NEWSLETTER, payload: response.data });
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

export const deleteNewsletterWithEmail = (email) => async (dispatch) => {
  setTokenHeader(newsletter);
  dispatch({ type: NO_MESSAGE });

  if (!email) {
    dispatch({ type: ERROR_MESSAGE, payload: "Niste unijeli email." });
  } else {
    newsletter
      .delete(`/`, { email: email })
      .then((response) => {
        dispatch({ type: REMOVE_FROM_NEWSLETTER, payload: response.data });
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

export const sendEmail = (formDataObj) => async (dispatch) => {
  dispatch({ type: NO_MESSAGE });
  console.log(formDataObj, Object.entries(formDataObj));

  const filteredFormDataEntries = Object.entries(formDataObj)
    .map(([k, v]) => {
      if (v === "") {
        return undefined;
      } else {
        return [k, v];
      }
    })
    .filter((el) => el !== undefined);

  if (filteredFormDataEntries.length !== 6) {
    dispatch({
      type: ERROR_MESSAGE,
      payload: "Sva polja moraju biti popunjena!",
    });
  } else {
    const others = Object.fromEntries(filteredFormDataEntries);
    emailjs
      .send("service_p6xd0zd", others.templateId, others, "yONqfiNk2jQNU2eND")
      .then(
        (result) => {
          dispatch({
            type: SUCCESS_MESSAGE,
            payload:
              result.text === "OK" ? "Email je uspješno poslat." : result.text,
          });
        },
        (error) => {
          dispatch({
            type: ERROR_MESSAGE,
            payload: error.text,
          });
        }
      );
  }
};

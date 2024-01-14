import { auth, user } from "../utils/toBackend";
import {
  ERROR_MESSAGE,
  FETCH_USER,
  NO_MESSAGE,
  SUCCESS_MESSAGE,
} from "../actions/types";
import emailjs from "@emailjs/browser";
import {
  deleteLocalStorage,
  getLocalStorage,
  setLocalStorage,
} from "../utils/localStorage";
import {
  deleteSessionStorage,
  setSessionStorage,
} from "../utils/sessionStorage";
import { generateRandomPassword } from "../utils/helper";

export const login = (formDataObj, ongoingOrder) => async (dispatch) => {
  dispatch({ type: NO_MESSAGE });
  console.log("login", formDataObj, ongoingOrder);
  const bodyParams = {
    usernameEmail: formDataObj.usernameEmail,
    password: formDataObj.password,
  };
  auth
    .post("/login", bodyParams)
    .then((res) => {
      if (formDataObj.rememberMe) {
        setLocalStorage("user", {
          token: res.data.token,
          id: res.data._id,
        });
      } else {
        setSessionStorage("user", {
          token: res.data.token,
          id: res.data._id,
        });
      }
      if (ongoingOrder) window.location.href = "/pay";
      else window.location.href = "/orders";
    })
    .catch((error) => {
      dispatch({
        type: ERROR_MESSAGE,
        payload: error.response.data,
      });
    });
};

export const loginByToken = (token, ongoingOrder) => async (dispatch) => {
  dispatch({ type: NO_MESSAGE });
  auth.defaults.headers.common["token"] = `Bearer ${token}`;
  auth
    .post("/loginByToken")
    .then((res) => {
      if (getLocalStorage("user")) {
        setLocalStorage("user", { token: res.data.token, id: res.data._id });
      } else {
        setSessionStorage("user", { token: res.data.token, id: res.data._id });
      }
      if (ongoingOrder) window.location.href = "/pay";
      else window.location.href = "/orders";
    })
    .catch((error) => {
      dispatch({
        type: ERROR_MESSAGE,
        payload: error.response.data,
      });
    });
};

export const logout = () => {
  deleteLocalStorage("user");
  deleteSessionStorage("user");
  window.location.href = "/";
  return { type: "LOGOUT" };
};

export const sendEmail = (others) => async (dispatch) => {
  dispatch({ type: NO_MESSAGE });
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
};

export const forgotPassword = (formDataObj) => async (dispatch) => {
  dispatch({ type: NO_MESSAGE });

  if (formDataObj.email == null || formDataObj.email === "") {
    dispatch({
      type: ERROR_MESSAGE,
      payload: "Obavezno je unošenje email-a!",
    });
  } else {
    user
      .post("/filter", formDataObj)
      .then((response) => {
        dispatch({ type: FETCH_USER, payload: response.data });
        let newPassword = generateRandomPassword();
        const message =
          "Poslat je zahtjev za resetovanje lozinke. Vaša privremena lozinka je " +
          newPassword.toString();
        const bodyRequest = {
          newPassword: newPassword,
          email: formDataObj.email,
        };
        auth
          .put("/fgpass", bodyRequest)
          .then((res) => {
            const emailObject = {
              to_email: formDataObj.email,
              from: "verdi.radnja.2010@gmail.com",
              name: "Verdi Radnja",
              subject: "Nova privremena lozinka",
              templateId: "template_jcmdzec",
              message: message,
            };
            dispatch(sendEmail(emailObject));
          })
          .catch((err) => {
            dispatch({ type: ERROR_MESSAGE, payload: err.response.data });
          });
      })
      .catch((error) => {
        dispatch({
          type: ERROR_MESSAGE,
          payload: error.response.data,
        });
      });
  }
};

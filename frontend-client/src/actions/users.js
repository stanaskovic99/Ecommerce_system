import {
  CREATE_USER,
  ERROR_MESSAGE,
  NO_MESSAGE,
  FETCH_USER,
  UPDATE_USER,
  SUCCESS_MESSAGE,
  DELETED_USER,
} from "./types";
import { user } from "../utils/toBackend";
import { setTokenHeader } from "../utils/helper";
import _ from "lodash";
import { getSessionStorage, setSessionStorage } from "../utils/sessionStorage";
import { getLocalStorage } from "../utils/localStorage";
import { logout, login } from "./auth";

export const fetchUser = (id) => async (dispatch) => {
  setTokenHeader(user);
  dispatch({ type: NO_MESSAGE });

  user
    .get(`/find/${id}`)
    .then((response) => {
      dispatch({ type: FETCH_USER, payload: response.data });
    })
    .catch((err) => {
      if (err.response?.status === 401) {
        window.location.href = "/authentication";
      } else {
        let errorMessage;
        if (err.response.data.message) {
          errorMessage = err.response.data.message;
        } else {
          errorMessage = err.response.data;
          console.error(errorMessage);
        }
        dispatch({
          type: ERROR_MESSAGE,
          payload: errorMessage,
        });
      }
    });
};

export const createUser = (formData, ongoingOrder) => async (dispatch) => {
  const entries = Object.entries(formData);
  const length = entries.length;
  const nonEmptyEntriesLength = entries.filter(([k, v]) => v !== "").length;
  dispatch({ type: NO_MESSAGE });

  if (length !== nonEmptyEntriesLength) {
    dispatch({
      type: ERROR_MESSAGE,
      payload: "Sva polja moraju biti popunjena!",
    });
  } else {
    if (formData.password !== formData.confirmPassword) {
      dispatch({
        type: ERROR_MESSAGE,
        payload: "Lozinka i potvrda lozinke moraju biti iste!",
      });
    } else {
      user
        .post("/", formData)
        .then((response) => {
          setSessionStorage("user", {
            id: response.data.user._id,
            token: response.data.token,
          });
          dispatch({ type: CREATE_USER, payload: response.data.user });
          if (ongoingOrder) window.location.href = "/pay";
          else window.location.href = "/orders";
        })
        .catch((err) => {
          console.error(err);
          dispatch({
            type: ERROR_MESSAGE,
            payload: err.response.data,
          });
        });
    }
  }
};

export const updateUser = (formData, oldData) => async (dispatch) => {
  setTokenHeader(user);
  dispatch({ type: NO_MESSAGE });

  if (formData.firstName !== "") oldData.firstName = formData.firstName;
  if (formData.lastName !== "") oldData.lastName = formData.lastName;
  if (formData.email !== "") oldData.email = formData.email;
  if (formData.username !== "") oldData.username = formData.username;
  if (formData.onNewsletter) {
    oldData.onNewsletter = formData.onNewsletter === "true" ? true : false;
  }

  user
    .put(`/${oldData._id}`, oldData)
    .then((response) => {
      dispatch({ type: UPDATE_USER, payload: response.data });
      dispatch({ type: SUCCESS_MESSAGE, payload: "Uspješno izmjenjeno!" });
    })
    .catch((err) => {
      console.error(err);
      if (err.response?.status === 401) {
        window.location.href = "/authentication";
      } else {
        dispatch({
          type: ERROR_MESSAGE,
          payload: err.response.data,
        });
      }
    });
};

export const changePassword =
  (formData, onLogin, ongoingOrder) => async (dispatch) => {
    dispatch({ type: NO_MESSAGE });

    if (
      formData.newPassword === "" ||
      formData.confirmNewPassword === "" ||
      formData.oldPassword === ""
    ) {
      dispatch({
        type: ERROR_MESSAGE,
        payload: "Moraju se popuniti sva polja!",
      });
    } else if (formData.newPassword !== formData.confirmNewPassword) {
      dispatch({
        type: ERROR_MESSAGE,
        payload: "Nova lozinka i potvrda nove lozinke moraju biti iste!",
      });
    } else {
      formData = _.omit(formData, "confirmNewPassword");
      user
        .put(`/chpass/${formData.id}`, formData)
        .then((response) => {
          dispatch({ type: UPDATE_USER, payload: response.data });
          dispatch({ type: SUCCESS_MESSAGE, payload: "Uspješno izmjenjeno" });
          console.log("login", onLogin, ongoingOrder);
          if (onLogin)
            dispatch(
              login(
                {
                  usernameEmail: formData.email,
                  password: formData.newPassword,
                },
                ongoingOrder
              )
            );
        })
        .catch((err) => {
          console.error(err);
          if (err.response?.status === 401) {
            if (ongoingOrder)
              window.location.href = "/authentication?ongoingOrder=true";
            else window.location.href = "/authentication";
          } else {
            dispatch({
              type: ERROR_MESSAGE,
              payload: err.response.data,
            });
          }
        });
    }
  };

export const deleteUser = () => async (dispatch) => {
  setTokenHeader(user);
  dispatch({ type: NO_MESSAGE });

  let account = getLocalStorage("user");
  if (!account) account = getSessionStorage("user");
  if (!account) {
    window.location.href = "/authentication";
    dispatch({ type: ERROR_MESSAGE, payload: "Niste prijavljeni." });
  } else {
    user
      .delete(`/${account.id}`)
      .then((res) => {
        window.location.href = "/authentication";
        dispatch(logout());
        dispatch({ type: DELETED_USER, payload: res.data });
        dispatch({
          type: SUCCESS_MESSAGE,
          payload: "Uspješno izbrisan nalog.",
        });
      })
      .catch((err) => {
        console.error(err);
        if (err.response?.status === 401) {
          window.location.href = "/authentication";
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            payload: err.response.data,
          });
        }
      });
  }
};

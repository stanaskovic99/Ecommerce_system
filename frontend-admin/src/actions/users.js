import {
  FETCH_USERS,
  UPDATE_USER,
  DELETE_USER,
  ERROR_MESSAGE,
  NO_MESSAGE,
  CREATE_USER,
  FETCH_USER,
  SUCCESS_MESSAGE,
  FETCH_USER_STATISTICS,
} from "./types";
import { user } from "../utils/toBackend";
import { setTokenHeader } from "../utils/helper";
import _ from "lodash";
import { getLocalStorage } from "../utils/localStorage";
import { getSessionStorage } from "../utils/sessionStorage";
import { logout, login } from "./auth";

export const fetchUsers = () => async (dispatch) => {
  setTokenHeader(user);
  dispatch({ type: NO_MESSAGE });

  user
    .get("/find")
    .then((response) => {
      dispatch({ type: FETCH_USERS, payload: response.data });
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

export const fetchUser = (id) => async (dispatch) => {
  setTokenHeader(user);
  dispatch({ type: NO_MESSAGE });

  user
    .get(`/find/${id}`)
    .then((response) => {
      dispatch({ type: FETCH_USER, payload: response.data });
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

export const createUser =
  (email, password, username, isAdmin, firstName, lastName) =>
  async (dispatch) => {
    setTokenHeader(user);
    dispatch({
      type: NO_MESSAGE,
    });

    let bodyRequest = {};
    if (email && email !== "") {
      bodyRequest.email = email;
    }
    if (password && password !== "") {
      bodyRequest.password = password;
    }
    if (username && username !== "") {
      bodyRequest.username = username;
    }
    if (isAdmin != null) {
      bodyRequest.isAdmin = isAdmin;
    }
    if (firstName && firstName !== "") {
      bodyRequest.firstName = firstName;
    }
    if (lastName && lastName !== "") {
      bodyRequest.lastName = lastName;
    }

    user
      .post("/", bodyRequest)
      .then((response) => {
        dispatch({ type: CREATE_USER, payload: response.data });
        window.location.href = "/users";
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

export const updateUser = (formData, oldData) => async (dispatch) => {
  setTokenHeader(user);
  dispatch({ type: NO_MESSAGE });
  console.log(formData, oldData);
  if (typeof formData.isAdmin === "string") {
  }
  if (formData.firstName && formData.firstName !== "")
    oldData.firstName = formData.firstName;
  if (formData.lastName && formData.lastName !== "")
    oldData.lastName = formData.lastName;
  if (formData.email && formData.email !== "") oldData.email = formData.email;
  if (formData.username && formData.username !== "")
    oldData.username = formData.username;
  if (formData.isAdmin) {
    oldData.isAdmin = formData.isAdmin === "true" ? true : false;
  }
  if (formData.onNewsletter) {
    oldData.onNewsletter = formData.onNewsletter === "true" ? true : false;
  }

  user
    .put(`/${oldData._id}`, oldData)
    .then((response) => {
      dispatch({ type: UPDATE_USER, payload: response.data });
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

export const deleteUser = (id) => async (dispatch) => {
  setTokenHeader(user);
  dispatch({ type: NO_MESSAGE });

  user
    .delete(`/${id}`)
    .then((response) => {
      dispatch({ type: DELETE_USER, payload: response.data });
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

export const deleteAccount = () => async (dispatch) => {
  setTokenHeader(user);
  dispatch({ type: NO_MESSAGE });

  let account = getLocalStorage("user");
  if (!account) account = getSessionStorage("user");
  if (!account) {
    window.location.href = "/login";
    dispatch({ type: ERROR_MESSAGE, payload: "Niste prijavljeni." });
  } else {
    user
      .delete(`/${account.id}`)
      .then((res) => {
        window.location.href = "/login";
        dispatch(logout());
        dispatch({
          type: SUCCESS_MESSAGE,
          payload: "Uspješno izbrisan nalog.",
        });
      })
      .catch((err) => {
        console.error(err);
        if (err.response?.status === 401) {
          window.location.href = "/login";
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            payload: err.response.data,
          });
        }
      });
  }
};

export const changePassword =
  (id, newPassword, confirmNewPassword, oldPassword, isLogin, email) =>
  async (dispatch) => {
    dispatch({ type: NO_MESSAGE });

    if (newPassword === "" || confirmNewPassword === "" || oldPassword === "") {
      dispatch({
        type: ERROR_MESSAGE,
        payload: "Moraju se popuniti sva polja!",
      });
    } else if (newPassword !== confirmNewPassword) {
      dispatch({
        type: ERROR_MESSAGE,
        payload: "Nova lozinka i potvrda nove lozinke moraju biti iste!",
      });
    } else {
      const bodyRequest = {
        newPassword: newPassword,
        oldPassword: oldPassword,
      };
      user
        .put(`/chpass/${id}`, bodyRequest)
        .then((response) => {
          dispatch({ type: UPDATE_USER, payload: response.data });
          dispatch({ type: SUCCESS_MESSAGE, payload: "Uspješno izmjenjeno." });

          console.log("login change pass", isLogin);
          if (isLogin) dispatch(login(email, newPassword, false));
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

export const fetchUserStatistic = () => async (dispatch) => {
  dispatch({ type: NO_MESSAGE });
  setTokenHeader(user);

  user
    .get("/stats")
    .then((res) => {
      dispatch({ type: FETCH_USER_STATISTICS, payload: res.data });
    })
    .catch((err) => {
      dispatch({
        type: ERROR_MESSAGE,
        payload: err.response.data,
      });
    });
};

import { getLocalStorage } from "./localStorage";
import { getSessionStorage } from "./sessionStorage";

export const setTokenHeader = (instance) => {
  let account = getLocalStorage("user");
  if (!account) {
    account = getSessionStorage("user");
  }
  if (account.token) {
    instance.defaults.headers.common["token"] = `Bearer ${account.token}`;
  }
};

export const stringUtcToLocalDateTimeString = (dateTime) => {
  return new Date(dateTime)?.toLocaleDateString("it-IT", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};

export const generateRandomPassword = () => {
  var length = 10,
    charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789?!",
    retVal = "";
  for (var i = 0; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return retVal;
};

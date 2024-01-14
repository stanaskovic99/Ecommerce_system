import { getLocalStorage } from "../utils/localStorage";
import { getSessionStorage } from "../utils/sessionStorage";

export const setTokenHeader = (instance) => {
  let account = getLocalStorage("user");
  if (!account) {
    account = getSessionStorage("user");
  }
  if (account.token) {
    instance.defaults.headers.common["token"] = `Bearer ${account.token}`;
  }
};

export const filePondFileToImageObject = (image) => {
  return {
    type: image?.fileType,
    data: image?.getFileEncodeBase64String(),
  };
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

export const imageObjectRemap = (image) => {
  return {
    isMainImage: image.isMainImage,
    data: image.data,
    type: image.type,
  };
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

export const mapIndexToMonthName = (index) => {
  switch (index) {
    case 1:
      return "Jan";
    case 2:
      return "Feb";
    case 3:
      return "Mar";
    case 4:
      return "Apr";
    case 5:
      return "Maj";
    case 6:
      return "Jun";
    case 7:
      return "Jul";
    case 8:
      return "Avg";
    case 9:
      return "Sep";
    case 10:
      return "Okt";
    case 11:
      return "Nov";
    case 12:
      return "Dec";
    default:
      return "Greška...";
  }
};

export const getSessionStorage = (key) => {
  try {
    const jsonValue = sessionStorage.getItem(key);
    if (jsonValue === null) {
      return undefined;
    }
    return JSON.parse(jsonValue);
  } catch (err) {
    console.log("Error getting local storage :", err);
    return undefined;
  }
};

export const setSessionStorage = (key, value) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.log("Error setting local storage :", err);
  }
};

export const deleteSessionStorage = (key) => {
  try {
    sessionStorage.removeItem(key);
  } catch (err) {
    console.log("Error deleting from local storage :", err);
  }
};

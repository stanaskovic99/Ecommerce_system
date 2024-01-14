export const getLocalStorage = (key) => {
  try {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue === null) {
      return undefined;
    }
    return JSON.parse(jsonValue);
  } catch (err) {
    console.log("Error getting local storage :", err);
    return undefined;
  }
};

export const setLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.log("Error setting local storage :", err);
  }
};

export const deleteLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.log("Error deleting from local storage :", err);
  }
};

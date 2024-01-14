import { category } from "../utils/toBackend";
import { ERROR_MESSAGE, NO_MESSAGE, FETCH_CATEGORIES } from "./types";

export const fetchCategories = () => async (dispatch) => {
  dispatch({ type: NO_MESSAGE });
  category
    .get("/find")
    .then((response) =>
      dispatch({ type: FETCH_CATEGORIES, payload: response.data })
    )
    .catch((err) => {
      console.error(err);
      dispatch({ type: ERROR_MESSAGE, payload: err });
    });
};

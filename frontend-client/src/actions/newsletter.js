import { newsletter } from "../utils/toBackend";
import { ERROR_MESSAGE, NO_MESSAGE, SUCCESS_MESSAGE } from "./types";

export const addNewsletter = (email) => async (dispatch) => {
  dispatch({ type: NO_MESSAGE });
  newsletter
    .post("/", {
      email: email,
    })
    .then((res) =>
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: "Email je dodat newsletteru.",
      })
    )
    .catch((err) => {
      console.error(err);
      dispatch({ type: ERROR_MESSAGE, payload: err });
    });
};

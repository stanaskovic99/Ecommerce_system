import { ERROR_MESSAGE, NO_MESSAGE, FETCH_INFO } from "./types";
import { info } from "../utils/toBackend";

export const fetchInfo = (id) => async (dispatch) => {
  dispatch({ type: NO_MESSAGE });
  info
    .get(`/find/${id}`)
    .then((response) => dispatch({ type: FETCH_INFO, payload: response.data }))
    .catch((err) => {
      console.error(err);
      dispatch({ type: ERROR_MESSAGE, payload: err });
    });
};

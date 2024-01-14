import { setTokenHeader } from "../utils/helper";
import { status } from "../utils/toBackend";
import { ERROR_MESSAGE, FETCH_STATUSES, NO_MESSAGE } from "./types";

export const fetchStatuses = () => async (dispatch) => {
  dispatch({ type: NO_MESSAGE });
  setTokenHeader(status);

  status
    .get("/find")
    .then((response) => {
      dispatch({ type: FETCH_STATUSES, payload: response.data });
    })
    .catch((err) => {
      dispatch({
        type: ERROR_MESSAGE,
        payload: err.response.data,
      });
    });
};

import { ad } from "../utils/toBackend";
import { ERROR_MESSAGE, NO_MESSAGE, FETCH_ADS } from "./types";

export const fetchAds = () => async (dispatch) => {
  dispatch({ type: NO_MESSAGE });
  ad.get("/find")
    .then((response) => dispatch({ type: FETCH_ADS, payload: response.data }))
    .catch((err) => {
      console.error(err);
      dispatch({ type: ERROR_MESSAGE, payload: err });
    });
};

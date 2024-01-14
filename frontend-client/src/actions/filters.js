import { fetchArticles } from "./article";
import { FILTERS_CHANGE } from "./types";

export const changeFilters = (filters) => async (dispatch) => {
  dispatch({ type: FILTERS_CHANGE, payload: filters });
  dispatch(fetchArticles(filters));
};

import { FETCH_ARTICLES, FETCH_ARTICLE } from "../actions/types";
import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_ARTICLES:
      return { ..._.mapKeys(action.payload, "_id") };
    case FETCH_ARTICLE:
      return { ...state, [action.payload._id]: action.payload };
    default:
      return state;
  }
};

import {
  FETCH_ARTICLES,
  UPDATE_ARTICLE,
  CREATE_ARTICLE,
  DELETE_ARTICLE,
  FETCH_ARTICLE,
} from "../actions/types";
import _ from "lodash";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_ARTICLES:
      return { ..._.mapKeys(action.payload, "_id") };
    case FETCH_ARTICLE:
      return { ...state, [action.payload._id]: action.payload };
    case CREATE_ARTICLE:
      return { ...state, [action.payload._id]: action.payload };
    case UPDATE_ARTICLE:
      return { ...state, [action.payload._id]: action.payload };
    case DELETE_ARTICLE:
      return _.omit(state, action.payload._id);
    default:
      return state;
  }
};

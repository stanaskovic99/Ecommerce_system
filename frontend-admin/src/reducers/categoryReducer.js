import {
  DELETE_CATEGORY,
  FETCH_CATEGORIES,
  UPDATE_CATEGORY,
  FETCH_CATEGORY,
  CREATE_CATEGORY,
} from "../actions/types";
import _ from "lodash";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return { ..._.mapKeys(action.payload, "_id") };
    case FETCH_CATEGORY:
      return { ...state, [action.payload._id]: action.payload };
    case CREATE_CATEGORY:
      return { ...state, [action.payload._id]: action.payload };
    case UPDATE_CATEGORY:
      return { ...state, [action.payload._id]: action.payload };
    case DELETE_CATEGORY:
      return _.omit(state, action.payload._id);
    default:
      return state;
  }
};

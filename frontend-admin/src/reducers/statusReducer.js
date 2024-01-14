import {
  FETCH_STATUSES,
  FETCH_STATUS,
  DELETE_STATUS,
  UPDATE_STATUS,
  CREATE_STATUS,
} from "../actions/types";
import _ from "lodash";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_STATUSES:
      return { ..._.mapKeys(action.payload, "_id") };
    case FETCH_STATUS:
      return { ...state, [action.payload._id]: action.payload };
    case CREATE_STATUS:
      return { ...state, [action.payload._id]: action.payload };
    case UPDATE_STATUS:
      return { ...state, [action.payload._id]: action.payload };
    case DELETE_STATUS:
      return _.omit(state, action.payload._id);
    default:
      return state;
  }
};

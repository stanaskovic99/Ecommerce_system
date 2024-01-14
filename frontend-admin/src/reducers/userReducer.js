import {
  UPDATE_USER,
  FETCH_USERS,
  DELETE_USER,
  CREATE_USER,
  FETCH_USER,
} from "../actions/types";
import _ from "lodash";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_USERS:
      return { ..._.mapKeys(action.payload, "_id") };
    case FETCH_USER:
      return { ...state, [action.payload._id]: action.payload };
    case CREATE_USER:
      return { ...state, [action.payload._id]: action.payload };
    case UPDATE_USER:
      return { ...state, [action.payload._id]: action.payload };
    case DELETE_USER:
      return _.omit(state, action.payload._id);
    default:
      return state;
  }
};

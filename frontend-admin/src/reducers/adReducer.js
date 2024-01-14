import {
  DELETE_AD,
  FETCH_ADS,
  UPDATE_AD,
  FETCH_AD,
  CREATE_AD,
} from "../actions/types";
import _ from "lodash";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_ADS:
      return { ..._.mapKeys(action.payload, "_id") };
    case FETCH_AD:
      return { ...state, [action.payload._id]: action.payload };
    case CREATE_AD:
      return { ...state, [action.payload._id]: action.payload };
    case UPDATE_AD:
      return { ...state, [action.payload._id]: action.payload };
    case DELETE_AD:
      return _.omit(state, action.payload._id);
    default:
      return state;
  }
};

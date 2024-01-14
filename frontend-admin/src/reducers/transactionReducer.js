import {
  DELETE_TRANSACTION,
  FETCH_TRANSACTION,
  UPDATE_TRANSACTION,
  FETCH_TRANSACTIONS,
  CREATE_TRANSACTION,
} from "../actions/types";
import _ from "lodash";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_TRANSACTIONS:
      return { ..._.mapKeys(action.payload, "_id") };
    case FETCH_TRANSACTION:
      return { ...state, [action.payload._id]: action.payload };
    case CREATE_TRANSACTION:
      return { ...state, [action.payload._id]: action.payload };
    case UPDATE_TRANSACTION:
      return { ...state, [action.payload._id]: action.payload };
    case DELETE_TRANSACTION:
      return _.omit(state, action.payload._id);
    default:
      return state;
  }
};

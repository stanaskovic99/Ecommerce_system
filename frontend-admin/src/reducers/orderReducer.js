import { FETCH_ORDERS, FETCH_ORDER, UPDATE_ORDER } from "../actions/types";
import _ from "lodash";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_ORDERS: {
      console.log({ ..._.mapKeys(action.payload, "_id") });
      return { ..._.mapKeys(action.payload, "_id") };
    }
    case FETCH_ORDER: {
      console.log(state);
      return { ...state, [action.payload._id]: action.payload };
    }
    case UPDATE_ORDER:
      return { ...state, [action.payload._id]: action.payload };
    default:
      return state;
  }
};

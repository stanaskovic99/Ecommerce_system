import { FETCH_BRANDS } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_BRANDS:
      return action.payload;
    default:
      return state;
  }
};

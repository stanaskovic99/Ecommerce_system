import { FETCH_SIZES } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_SIZES:
      return action.payload;
    default:
      return state;
  }
};

import { FETCH_INFO, UPDATE_INFO } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_INFO:
      return action.payload;
    case UPDATE_INFO:
      return action.payload;
    default:
      return state;
  }
};

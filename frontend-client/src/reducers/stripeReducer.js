import { CREATED_PI, SET_TOTAL } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case CREATED_PI:
      return action.payload;
    default:
      return state;
  }
};

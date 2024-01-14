import { FILTERS_CHANGE } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FILTERS_CHANGE:
      return action.payload;
    default:
      return state;
  }
};

import { FETCH_STATUSES } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_STATUSES:
      return action.payload;
    default:
      return state;
  }
};

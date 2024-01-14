import {
  CREATE_USER,
  DELETED_USER,
  FETCH_USER,
  UPDATE_USER,
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_USER:
      return action.payload;
    case FETCH_USER:
      return action.payload;
    case UPDATE_USER:
      return action.payload;
    case DELETED_USER:
      return undefined;
    default:
      return state;
  }
};

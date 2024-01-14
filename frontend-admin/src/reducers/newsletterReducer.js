import {
  FETCH_NEWSLETTER_EMAILS,
  ADD_TO_NEWSLETTER,
  UPDATE_EMAIL_IN_NEWSLETTER,
  REMOVE_FROM_NEWSLETTER,
} from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_NEWSLETTER_EMAILS:
      return action.payload;
    case ADD_TO_NEWSLETTER:
      return [...state, action.payload];
    case UPDATE_EMAIL_IN_NEWSLETTER:
      return state.map((el) =>
        el._id === action.payload._id ? action.payload : el
      );
    case REMOVE_FROM_NEWSLETTER:
      return state.filter((el) => el._id !== action.payload._id);
    default:
      return state;
  }
};

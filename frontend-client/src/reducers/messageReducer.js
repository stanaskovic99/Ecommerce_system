import { ERROR_MESSAGE, SUCCESS_MESSAGE, NO_MESSAGE } from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case SUCCESS_MESSAGE:
      return { text: action.payload, error: false };
    case ERROR_MESSAGE:
      return { text: action.payload, error: true };
    case NO_MESSAGE:
      return null;
    default:
      return state;
  }
};

import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  FETCH_CART,
  UPDATE_CART_ITEM,
} from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return action.payload;
    case REMOVE_FROM_CART:
      return action.payload;
    case FETCH_CART:
      return action.payload;
    case UPDATE_CART_ITEM:
      return action.payload;
    default:
      return state;
  }
};

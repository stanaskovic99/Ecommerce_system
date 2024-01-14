import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  FETCH_CART,
  UPDATE_CART_ITEM,
} from "./types";
import {
  getSessionStorage,
  setSessionStorage,
  deleteSessionStorage,
} from "../utils/sessionStorage";

export const addToCart = (id, size, quantity) => async (dispatch) => {
  const cart = getSessionStorage("cart") || [];

  const duplicate = cart.filter((item) => item.id === id && item.size === size);

  if (duplicate.length === 0) {
    const newCart = { id, size, quantity };
    cart.push(newCart);
  }

  setSessionStorage("cart", cart);
  dispatch({ type: ADD_TO_CART, payload: cart });
};

export const removeFromCart = (id, size) => async (dispatch) => {
  const cart = getSessionStorage("cart") || [];
  const updatedCart = cart.filter(
    (item) => item.id !== id && item.size !== size
  );
  if (updatedCart.length == 0) {
    deleteSessionStorage("cart", undefined);
  } else {
    setSessionStorage("cart", updatedCart);
  }

  dispatch({ type: REMOVE_FROM_CART, payload: updatedCart });
};

export const updateItemFromCart =
  (id, size, updatedQuantity) => async (dispatch) => {
    const cart = getSessionStorage("cart");
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.size === size) {
        item.quantity = updatedQuantity;
      }
      return item;
    });
    setSessionStorage("cart", updatedCart);
    dispatch({ type: UPDATE_CART_ITEM, payload: updatedCart });
  };

export const fetchCart = () => async (dispatch) => {
  const cart = getSessionStorage("cart") || [];
  dispatch({ type: FETCH_CART, payload: cart });
};

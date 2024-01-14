import { setTokenHeader } from "../utils/helper";
import { getLocalStorage } from "../utils/localStorage";
import {
  deleteSessionStorage,
  getSessionStorage,
} from "../utils/sessionStorage";
import { order } from "../utils/toBackend";
import { updateArticleStock } from "./article";
import {
  ERROR_MESSAGE,
  CREATED_ORDER,
  FETCH_ORDERS,
  NO_MESSAGE,
  REMOVE_FROM_CART,
} from "./types";

export const createOrder =
  (fullName, email, amount, address, id, phone) => async (dispatch) => {
    let user = getSessionStorage("user");
    if (!user) user = getLocalStorage("user");
    const cart = getSessionStorage("cart");
    if (!cart) {
      dispatch({ type: ERROR_MESSAGE, payload: "Korpa je prazna." });
    } else {
      dispatch({ type: NO_MESSAGE });
      setTokenHeader(order);

      order
        .post(`/${user.id}`, {
          fullName: fullName,
          email: email,
          total: amount / 100,
          address: mapAddressForDB(address),
          articles: mapArticlesForDB(cart),
          paymentId: id,
          phone: phone,
        })
        .then((response) => {
          dispatch({ type: CREATED_ORDER, payload: response.data });
          dispatch(fetchOrders());
          deleteSessionStorage("cart");
          window.history.pushState("data", "Verdi", "/orders/" + user.id);
          dispatch({ type: REMOVE_FROM_CART, payload: [] });
        })
        .catch((err) => {
          dispatch({
            type: ERROR_MESSAGE,
            payload: `${err.response.data} Pozovite na naš kontakt broj.`,
          });
          console.error(err.response.data);
        });
    }
  };

export const fetchOrders = () => async (dispatch) => {
  let user = getSessionStorage("user");
  if (!user) user = getLocalStorage("user");
  dispatch({ type: NO_MESSAGE });

  setTokenHeader(order);

  order
    .get(`/filter/${user.id}`)
    .then((response) => {
      dispatch({ type: FETCH_ORDERS, payload: response.data });
    })
    .catch((err) => {
      console.error(err.response.data);
      dispatch({
        type: ERROR_MESSAGE,
        payload: err.response.data,
      });
    });
};

const mapArticlesForDB = (articles) => {
  return (
    articles || [{ id: "6397f37bac1c6fba6ab06a54", size: "a", quantity: 2 }]
  )?.map((item) => {
    return {
      _idArticle: item.id,
      quantity: item.quantity,
      size: item.size,
    };
  });
};

const mapAddressForDB = (address) => {
  return {
    city: address.city,
    country: address.country,
    streetAndNumber: address.line1,
    postalCode: address.postal_code,
    additionalInfo: address.line2,
  };
};

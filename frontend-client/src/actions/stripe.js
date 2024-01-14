import { setTokenHeader } from "../utils/helper";
import { getLocalStorage } from "../utils/localStorage";
import { getSessionStorage } from "../utils/sessionStorage";
import { checkout } from "../utils/toBackend";
import { createOrder } from "./order";
import {
  CREATED_PI,
  ERROR_MESSAGE,
  NO_MESSAGE,
  SUCCESS_MESSAGE,
} from "./types";

export const createPaymentIntent = (total) => async (dispatch) => {
  const cart = getSessionStorage("cart");
  let user = getSessionStorage("user");
  if (user == null) {
    user = getLocalStorage("user");
  }
  dispatch({ type: NO_MESSAGE });

  if (cart == null) {
    dispatch({
      type: ERROR_MESSAGE,
      type: "Korpa je prazna. Napunite je prvo!",
    });
  } else if (user == null) {
    window.location.href = "/authentication?ongoingOrder=true";
  } else {
    setTokenHeader(checkout);

    checkout
      .post("/create-payment-intent", {
        amount: total * 100,
      })
      .then((response) => {
        dispatch({ type: CREATED_PI, payload: response.data });
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: ERROR_MESSAGE,
          payload:
            "Postoji problem da kreiramo formu za uplatu. Probaj te ponovo.",
        });
      });
  }
};

export const deletePaymentIntent = (paymentId) => async (dispatch) => {
  dispatch({ type: NO_MESSAGE });
  setTokenHeader(checkout);
  await checkout
    .post("/delete-payment-intent", {
      paymentIntentId: paymentId,
    })
    .then((res) => (window.location.href = "/cart"))
    .catch((err) => {
      console.error(err);
      dispatch({
        type: ERROR_MESSAGE,
        payload: "Postoji problem da prekinemo transakciju. Probaj te ponovo.",
      });
    });
};

export const confirmPaymentIntent =
  (stripeElement, elements, billingAddress, userId) => async (dispatch) => {
    dispatch({ type: NO_MESSAGE });

    await stripeElement
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: "http://localhost:5002/orders/" + userId,
          payment_method_data: {
            billing_details: billingAddress,
          },
        },
      })
      .then((res) => {
        if (
          res.error.type === "card_error" ||
          res.error.type === "validation_error"
        ) {
          dispatch({ type: ERROR_MESSAGE, payload: res.error.message });
        } else {
          console.error(res);
          dispatch({
            type: ERROR_MESSAGE,
            payload: "Neočekivana greška se desila.",
          });
        }
      });
  };

export const fetchPaymentIntent = (paymentIntentId) => async (dispatch) => {
  dispatch({ type: NO_MESSAGE });
  setTokenHeader(checkout);

  checkout
    .get(`/fetch-payment-intent/${paymentIntentId}`)
    .then((response) => {
      if (response.data.status === "succeeded") {
        dispatch({
          type: SUCCESS_MESSAGE,
          payload: "Transakcija je uspješna.",
        });

        dispatch(
          createOrder(
            response.data.shipping.name,
            response.data.receipt_email,
            response.data.amount,
            response.data.shipping.address,
            response.data.id,
            response.data.shipping.phone
          )
        );
      } else
        dispatch({
          type: ERROR_MESSAGE,
          payload: `Transakcija je u stanju ${response.data.status}`,
        });
    })
    .catch((err) => {
      console.error(err);
      dispatch({
        type: ERROR_MESSAGE,
        payload: "Greška se desila prilikom transakcije",
      });
    });
};

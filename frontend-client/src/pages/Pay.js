import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createPaymentIntent } from "../actions/stripe";
import CheckoutForm from "../components/forms/CheckoutForm";
import { fetchCart } from "../actions/cart";
import { fetchArticles } from "../actions/article";
import { fetchInfo } from "../actions/info";
import { fetchUser } from "../actions/users";
import { getLocalStorage } from "../utils/localStorage";
import { getSessionStorage } from "../utils/sessionStorage";

const stripePromise = loadStripe(
  "pk_test_51LLOjYCu4KRKFNCXzAhKySb21h43rY6GiK2L6TnHU7svMq7jWHi3HvxXM4Dcvx0voZhjzQH3FdcATHyfGdvryaSF00R7tUWN3s"
);

const Pay = (props) => {
  const [clientSecret, setClientSecret] = useState(null);
  const [paymentId, setPaymentId] = useState("");

  let options = {
    clientSecret: clientSecret,
    locale: "hr",
    appearance: {
      theme: "stripe",
    },
  };

  const calculateTotal = () => {
    let total = 0;
    props.cart.map((item) => {
      const price = props.articles[item.id]?.price?.$numberDecimal;
      total += parseInt(price, 10) * item.quantity;
    });
    total += parseInt(props.info.delivery?.$numberDecimal, 10);
    return total;
  };

  useEffect(() => {
    let user = getLocalStorage("user");
    if (!user) user = getSessionStorage("user");
    props.fetchArticles({});
    props.fetchCart();
    if (Object.keys(props.info).length === 0)
      props.fetchInfo("62d50f87caf72949e6a207ae");
    props.fetchUser(user.id);
  }, []);

  useEffect(() => {
    const articlesLength = Object.keys(props.articles).length;
    const cartLength = props.cart.length;
    const infoLength = Object.keys(props.info).length;
    if (infoLength != 0 && cartLength != 0 && articlesLength != 0) {
      const total = calculateTotal();
      props.createPaymentIntent(total);
    }
  }, [props.cart, props.articles, props.info]);

  useEffect(() => {
    if (props.paymentIntent != null) {
      setClientSecret(props.paymentIntent.client_secret);
      setPaymentId(props.paymentIntent.id);
    }
  }, [props.paymentIntent]);

  return (
    <div>
      {clientSecret && (
        <div className="container-checkout text-bg-light p-3 shadow-lg bg-primary bg-opacity-10 rounded">
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm
              clientSecret={clientSecret}
              paymentId={paymentId}
              user={props.user}
            />
          </Elements>
        </div>
      )}
    </div>
  );
};

const makeStateToProps = (state) => {
  return {
    paymentIntent: state.paymentIntent,
    articles: state.articles,
    cart: state.cart,
    info: state.info,
    user: state.user,
  };
};

export default connect(makeStateToProps, {
  createPaymentIntent,
  fetchArticles,
  fetchCart,
  fetchInfo,
  fetchUser,
})(Pay);

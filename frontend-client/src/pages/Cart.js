import React, { useEffect } from "react";
import { connect } from "react-redux";

import CartItem from "./CartItem";

import Summary from "../components/Summary";
import { fetchCart } from "../actions/cart";
import { fetchArticles } from "../actions/article";
import { Link } from "react-router-dom";
import { fetchInfo } from "../actions/info";
import Newsletter from "../components/Newsletter";

const Cart = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    props.fetchArticles({});
    props.fetchCart();
    if (Object.keys(props.info).length === 0)
      props.fetchInfo("62d50f87caf72949e6a207ae");
  }, []);

  let priceTotal = 0;

  const showCartItem = () => {
    if (Object.keys(props.articles).length !== 0) {
      return props.cart.map((item) => {
        console.log(props.articles[item.id]);
        let numberMaximumAmount;
        numberMaximumAmount = props.articles[item.id]?.stock.filter(
          (a) => a.size === item.size
        )[0].amount;

        const price = props.articles[item.id]?.price?.$numberDecimal;
        priceTotal += parseInt(price, 10) * item.quantity;
        return (
          <CartItem
            key={`${item.id}_${item.size}`}
            image={
              props.articles[item.id]?.images?.filter(
                (el) => el.isMainImage === true
              )[0].srcImage
            }
            articleId={item.id}
            brand={props.articles[item.id]?.brand}
            category={props.articles[item.id]?.category}
            size={item.size}
            quantity={item.quantity}
            price={price}
            numberMaximumAmount={numberMaximumAmount}
          />
        );
      });
    } else {
      return <div>Loading ...</div>;
    }
  };

  return (
    <div>
      <div className="container_cart">
        <h1 className="heading_cart">TVOJA KORPA</h1>
        <Link to="/articles">
          <button type="button" className="btn btn-dark mb-5 mt-3">
            NASTAVI KUPOVINOM
          </button>
        </Link>
        {props.cart.length !== 0 && (
          <div className="row gx-0">
            <div className="col-md-8">
              <div className="me-md-5">{showCartItem()}</div>
            </div>
            <div className="col-md-4 mt-5 mt-md-0">
              <Summary
                price={priceTotal}
                delivery={props.info?.delivery?.$numberDecimal}
              />
            </div>
          </div>
        )}
        {props.cart.length === 0 && (
          <div className="text-center fs-4">Korpa je prazna</div>
        )}
      </div>
      <Newsletter />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    articles: state.articles,
    cart: state.cart,
    info: state.info,
  };
};

export default connect(mapStateToProps, {
  fetchArticles,
  fetchCart,
  fetchInfo,
})(Cart);

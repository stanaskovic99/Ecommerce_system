import React from "react";
import { Add, Remove } from "@material-ui/icons";
import _ from "lodash";
import { updateItemFromCart, removeFromCart } from "../actions/cart";
import { connect } from "react-redux";

const CartItem = (props) => {
  const {
    image,
    articleId,
    brand,
    category,
    size,
    quantity,
    price,
    numberMaximumAmount,
  } = props;
  const onPlusClick = (plus) => {
    var newValue;
    if (plus) {
      newValue =
        quantity + 1 >= numberMaximumAmount
          ? numberMaximumAmount
          : quantity + 1;
    } else {
      newValue = quantity > 2 ? quantity - 1 : 1;
    }
    if (quantity !== newValue) {
      props.updateItemFromCart(articleId, size, newValue);
    }
  };

  const onDeleteButtonClick = () => {
    props.removeFromCart(articleId, size);
  };

  return (
    <div className="border border-secondary rounded position-relative my-2 gx-0 ">
      <div className="close_cart_item" onClick={() => onDeleteButtonClick()}>
        X
      </div>
      <div className="row gx-0">
        <div className="col-12 col-md-4 mt-5 mt-md-0 p-md-2">
          <div className="cart_item_col_container cart_image_container">
            <img src={image} alt="First show" className="cart_image" />
          </div>
        </div>
        <div className="col-12 col-sm-7 col-md-5 mt-md-0">
          <div className="cart_item_col_container">
            <div className="card_item_details w-100 h-100 align-items-center justify-content-center">
              <div className="info-row row row-cols-auto w-100 gx-0 px-4 px-md-0">
                <span className="info-row-name col me-1">Šifra:</span>
                <span className="col text-truncate">{articleId}</span>
              </div>
              <div className="info-row row row-cols-auto w-100 gx-0 px-4 px-md-0">
                <span className="info-row-name col me-1">Brand:</span>
                <span className="col text-truncate">{brand}</span>
              </div>
              <div className="info-row row row-cols-auto w-100 gx-0 px-4 px-md-0">
                <span className="info-row-name col me-1">Kategorija:</span>
                <span className="col text-truncate">{category}</span>
              </div>
              {size && (
                <div className="info-row row row-cols-auto w-100 gx-0 px-4 px-md-0">
                  <span className="info-row-name col me-1">Veličina:</span>
                  <span className="col text-truncate">{size}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-5 col-md-3 d-flex align-items-center justify-content-center mt-md-0">
          <div className="cart_item_col_container height_md mb-3 mb-md-0">
            <div className="amount_price_cart_item_container w-100 h-100">
              <div className="amount_cart_item_container">
                <Remove fontSize="large" onClick={() => onPlusClick(false)} />
                <div className="amount_cart_item">{quantity}</div>
                <Add fontSize="large" onClick={() => onPlusClick(true)} />
              </div>
              <div className="my-1">{price} KM</div>
            </div>
          </div>
        </div>
        {/* <div className="col-2 col-md-1 border border-success d-flex align-items-center justify-content-center gx-1">
        <div className="cart_item_col_container height_md">
          <div className="d-flex close_cart_item_container"></div>
        </div>
      </div> */}
      </div>
    </div>
  );
};

export default connect(null, { updateItemFromCart, removeFromCart })(CartItem);

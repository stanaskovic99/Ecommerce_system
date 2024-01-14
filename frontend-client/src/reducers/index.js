import { combineReducers } from "redux";
import adReducer from "./adReducer";
import articleReducer from "./articleReducer";
import categoryReducer from "./categoryReducer";
import filterReducer from "./filterReducer";
import infoReducer from "./infoReducer";
import brandReducer from "./brandReducer";
import cartReducer from "./cartReducer";
import userReducer from "./userReducer";
import messageReducer from "./messageReducer";
import stripeReducer from "./stripeReducer";
import orderReducer from "./orderReducer";
import statusReducer from "./statusReducer";
import sizeReducer from "./sizeReducer";

export default combineReducers({
  ads: adReducer,
  categories: categoryReducer,
  articles: articleReducer,
  filters: filterReducer,
  info: infoReducer,
  brands: brandReducer,
  sizes: sizeReducer,
  cart: cartReducer,
  user: userReducer,
  message: messageReducer,
  paymentIntent: stripeReducer,
  orders: orderReducer,
  status: statusReducer,
});

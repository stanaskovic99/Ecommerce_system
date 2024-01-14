import { combineReducers } from "redux";
import adReducer from "./adReducer";
import articleReducer from "./articleReducer";
import categoryReducer from "./categoryReducer";
import messageReducer from "./messageReducer";
import newsletterReducer from "./newsletterReducer";
import orderReducer from "./orderReducer";
import statusReducer from "./statusReducer";
import userReducer from "./userReducer";
import statisticsReducer from "./statisticsReducer";
import transactionReducer from "./transactionReducer";
import infoReducer from "./infoReducer";

export default combineReducers({
  users: userReducer,
  message: messageReducer,
  statuses: statusReducer,
  ads: adReducer,
  emails: newsletterReducer,
  categories: categoryReducer,
  articles: articleReducer,
  orders: orderReducer,
  statistics: statisticsReducer,
  info: infoReducer,
  transactions: transactionReducer,
});

import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Statuses from "./pages/Statuses";
import Ads from "./pages/Ads";
import Category from "./pages/Category";
import Articles from "./pages/Articles";
import Orders from "./pages/Orders";
import Newsletter from "./pages/Newsletter";
import EditUser from "./pages/EditUser";
import EditStatus from "./pages/EditStatus";
import EditAd from "./pages/EditAd";
import EditCategory from "./pages/EditCategory";
import EditArticle from "./pages/EditArticle";
import NewArticle from "./pages/NewArticle";
import NewEmail from "./pages/NewEmail";
import NewCategory from "./pages/NewCategory";
import NewAd from "./pages/NewAd";
import NewStatus from "./pages/NewStatus";
import NewUser from "./pages/NewUser";
import Login from "./pages/Login";
import ChangePassword from "./pages/ChangePassword";
import Email from "./pages/Email";
import ForgotPassword from "./pages/ForgotPassword";
import InfoShop from "./pages/InfoShop";
import NewTransaction from "./pages/NewTransaction";

import "./styles/ForgotPassword.css";
import "./styles/InfoCards.css";
import "./styles/Chart.css";
import "./styles/App.css";
import "./styles/CustomTableToolbar.css";
import "./styles/CustomDataGrid.css";
import "./styles/Articles.css";
import "./styles/InfoShop.css";
import "./styles/Login.css";
import "./styles/Menu.css";
import "./styles/Popup.css";
import "./styles/User.css";
import "./styles/Widget.css";
import EditTransaction from "./pages/EditTransaction";
import Transaction from "./pages/Transaction";
import Order from "./pages/Order";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/home" exact component={Home} />
        <Route path="/users" exact component={Users} />
        <Route path="/edit-user/:id" exact component={EditUser} />
        <Route path="/edit-status/:id" exact component={EditStatus} />
        <Route path="/edit-ad/:id" exact component={EditAd} />
        <Route path="/edit-category/:id" exact component={EditCategory} />
        <Route path="/edit-article/:id" exact component={EditArticle} />
        <Route path="/new-user" exact component={NewUser} />
        <Route path="/new-article" exact component={NewArticle} />
        <Route path="/new-category" exact component={NewCategory} />
        <Route path="/new-ad" exact component={NewAd} />
        <Route path="/new-email" exact component={NewEmail} />
        <Route path="/new-transaction" exact component={NewTransaction} />
        <Route path="/new-status" exact component={NewStatus} />
        <Route path="/statuses" exact component={Statuses} />
        <Route path="/ads" exact component={Ads} />
        <Route path="/newsletter" exact component={Newsletter} />
        <Route path="/categories" exact component={Category} />
        <Route path="/transactions" exact component={Transaction} />
        <Route path="/articles" exact component={Articles} />
        <Route path="/orders" exact component={Orders} />
        <Route path="/ch-pass/:id" exact component={ChangePassword} />
        <Route path="/email" exact component={Email} />
        <Route path="/forgot-password" exact component={ForgotPassword} />
        <Route path="/info" exact component={InfoShop} />
        <Route path="/order/:id" exact component={Order} />
        <Route path="/edit-transaction/:id" exact component={EditTransaction} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;

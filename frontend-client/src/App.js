import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Article from "./pages/Article";
import Articles from "./pages/Articles";
import Authentication from "./pages/Authentication";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import Pay from "./pages/Pay";
import Navigationbar from "./components/Navigationbar";
import Footer from "./components/Footer";

import "./styles/Home.css";
import "./styles/CartItem.css";
import "./styles/Cart.css";
import "./styles/Summary.css";
import "./styles/Newsletter.css";
import "./styles/Navbar.css";
import "./styles/Authentication.css";
import "./styles/Footer.css";
import "./styles/App.css";
import "./styles/Filters.css";
import "./styles/CustomTableToolbar.css";
import "./styles/CustomDataGrid.css";
import "./styles/StripeCheckout.css";
import "./styles/Category.css";
import "./styles/Article.css";
import "./styles/ArticlePage.css";
import "./styles/Ad.css";

const App = () => {
  return (
    <div className="container-fluid gx-0">
      <BrowserRouter>
        <Navigationbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/articles" component={Articles} />
          <Route path="/article/:id" component={Article} />
          <Route path="/cart" component={Cart} />
          <Route path="/pay" component={Pay} />
          <Route path="/orders" component={Orders} />
          <Route path="/orders/:id" component={Orders} />
          <Route path="/authentication" component={Authentication} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;

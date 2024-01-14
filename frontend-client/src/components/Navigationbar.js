import { React, useState, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { connect } from "react-redux";
import { fetchCart } from "../actions/cart";
import { getLocalStorage } from "../utils/localStorage";
import { getSessionStorage } from "../utils/sessionStorage";
import { logout } from "../actions/auth";

const Navigationbar = (props) => {
  const params = new URLSearchParams(window.location.search);
  const pathname = window.location.pathname;
  const search = params.get("search");

  const pom = search ? search : "";
  const [inputText, setInputText] = useState(pom);

  useEffect(() => {
    props.fetchCart();
  }, []);

  const OnFormSubmit = (event) => {
    event.preventDefault();
    window.location.href = "/articles?search=" + inputText;
  };

  const userInStorage = () => {
    let user = getLocalStorage("user");
    if (!user) user = getSessionStorage("user");
    return user ? true : false;
  };

  const showBadge = () => {
    if (props.cart.length !== 0 && pathname !== "/cart") {
      return (
        <span className="position-absolute top-20 start-lg-100 translate-middle badge rounded-pill bg-danger badge-mobile">
          {props.cart.length}
          <span className="visually-hidden">Dodati artikli u korpi</span>
        </span>
      );
    }
  };

  return (
    <Navbar bg="dark" expand="md" sticky="top">
      <Container fluid>
        <Navbar.Brand href="/">
          <h1 className="ms-3 text-white header_nav">Verdi</h1>
        </Navbar.Brand>
        <Navbar.Toggle className="ms-auto bg-light shadow-none me-3" />
        <Navbar.Collapse id="basic-navbar-nav" className="mx-3 ">
          <Nav className="me-auto text-white" navbarScroll>
            <Nav.Link href="/" bsPrefix="nav-link text-white">
              Početna
            </Nav.Link>
            <Nav.Link href="/articles" bsPrefix="nav-link text-white">
              Artikli
            </Nav.Link>
            <Nav.Link href="/cart" bsPrefix="nav-link text-white">
              Korpa
              {showBadge()}
            </Nav.Link>

            {!userInStorage() && (
              <Nav.Link
                href="/authentication"
                bsPrefix="nav-link text-white  mb-2 position-relative"
              >
                Prijava
              </Nav.Link>
            )}
            {userInStorage() && (
              <Nav.Link
                href="/orders"
                bsPrefix="nav-link text-white  mb-2 position-relative"
              >
                Profil
              </Nav.Link>
            )}
            {userInStorage() && (
              <Nav.Link
                bsPrefix="nav-link text-white  mb-2 position-relative"
                onClick={() => props.logout()}
              >
                Odjava
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            <Form className="d-flex" onSubmit={OnFormSubmit}>
              <InputGroup className="">
                <Form.Control
                  type="search"
                  placeholder="Potraži"
                  className="m-0 border-0 form-control-sm shadow-none"
                  onChange={(event) => {
                    setInputText(event.target.value);
                  }}
                  value={inputText}
                />
                <Button type="submit" variant="light">
                  <SearchIcon />
                </Button>
              </InputGroup>
            </Form>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart || [],
  };
};

export default connect(mapStateToProps, { fetchCart, logout })(Navigationbar);

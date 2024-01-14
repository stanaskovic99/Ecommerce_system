import React from "react";
import _ from "lodash";

import Dropdown from "react-bootstrap/Dropdown";
import { Add, Remove } from "@material-ui/icons";
import { connect } from "react-redux";
import { fetchArticle } from "../actions/article";
import { addToCart } from "../actions/cart";
import { fetchCategories } from "../actions/category";
import Newsletter from "../components/Newsletter";

class Article extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSize: "Odaberi",
      selectedAmountNumber: 1,
      errorMessage: null,
      successMessage: null,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const { id } = this.props.match.params;
    this.props.fetchArticle(id);
    if (this.props.categories.length === 0) this.props.fetchCategories();
  }

  multisizeCategory() {
    return this.props.categories.filter(
      (el) => el.name === this.props.article?.category
    )[0]?.multisize;
  }

  showSizes() {
    if (this.multisizeCategory()) {
      return (
        <div className="filter_number">
          <p className="text-uppercase numbers">
            <b>Dostupne veličine</b>
          </p>
          <Dropdown className="dropdown_filter">
            <Dropdown.Toggle
              variant="outline-secondary mb-1 shadow-none"
              size="xs"
            >
              {this.state.selectedSize}
            </Dropdown.Toggle>
            <Dropdown.Menu variant="dark">
              {this.renderDropdownSizes()}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      );
    }
  }

  renderDropdownSizes() {
    if (!this.props.article) {
      return <div></div>;
    } else {
      var sizes = [];
      const stock = this.props.article.stock;
      for (var i = 0; i < stock.length; i++) {
        if (stock[i].amount > 0) {
          sizes.push(stock[i].size);
        }
      }
      return sizes.map((n) => {
        return (
          <Dropdown.Item
            key={n}
            onClick={(e) => {
              this.setState({ selectedSize: n });
            }}
          >
            {n}
          </Dropdown.Item>
        );
      });
    }
  }

  renderLittleImages() {
    let key = 1;
    if (!this.props.article) {
      return <div></div>;
    } else {
      return this.props.article.images
        .filter((el) => el.isMainImage === false)
        .map((image) => {
          return (
            <div className="col gx-0 my-1" key={key++}>
              <div className="little_image_container">
                <img
                  src={image.srcImage}
                  alt="First show"
                  className="little_image"
                />
              </div>
            </div>
          );
        });
    }
  }

  onPlusClick(plus) {
    var newValue;
    var amount;
    if (this.multisizeCategory()) {
      const size = this.state.selectedSize;
      amount =
        size !== "Odaberi"
          ? this.props.article.stock.filter(
              (el) => el.size === this.state.selectedSize
            )[0]?.amount
          : 1;
    } else {
      amount = this.props.article.stock.filter((el) => el.size === "unisize")[0]
        ?.amount;
    }
    if (plus) {
      newValue =
        this.state.selectedAmountNumber + 1 >= amount
          ? amount
          : this.state.selectedAmountNumber + 1;
    } else {
      newValue =
        this.state.selectedAmountNumber > 2
          ? this.state.selectedAmountNumber - 1
          : 1;
    }
    this.setState({
      ...this.state,
      selectedAmountNumber: newValue,
    });
  }

  onAddCart() {
    if (!this.multisizeCategory()) {
      this.props.addToCart(
        this.props.match.params.id,
        "unisize",
        this.state.selectedAmountNumber
      );
      this.setState({
        ...this.state,
        successMessage: "Dodato u korpu",
      });
    } else if (this.state.selectedSize !== "Odaberi") {
      this.props.addToCart(
        this.props.match.params.id,
        this.state.selectedSize,
        this.state.selectedAmountNumber
      );
      this.setState({
        ...this.state,
        successMessage: "Dodato u korpu",
      });
    } else {
      this.setState({
        ...this.state,
        errorMessage: "Niste odabrali veličinu!",
      });
    }
  }

  render() {
    const { article } = this.props;
    return (
      <div>
        <div className="row row-cols-1 row-cols-md-2 wrapper gx-0">
          <div className="col gx-0">
            <div className="big_image_container">
              <img
                src={
                  article &&
                  article.images.filter((el) => el.isMainImage === true)[0]
                    .srcImage
                }
                alt="First show"
                className="big_image"
              />
            </div>
            <div className="row gx-0 row_images">
              {this.renderLittleImages()}
            </div>
          </div>
          <div className="col gx-0">
            <div className="info_container">
              <h1>{article?.brand}</h1>
              <p className="description">
                <b>KATEGORIJA: </b>
                {article?.category}
              </p>
              <p className="description">
                <b>ŠIFRA: </b>
                {article?.articleId}
              </p>
              <p className="description">
                <b>OPIS: </b>
                {article?.description}
              </p>
              {this.showSizes()}
              <div className="prise_container">
                <h2>{article?.price.$numberDecimal} KM</h2>
                {article?.priceWithoutDiscount && (
                  <h2 className="prise_crossed">
                    {article.priceWithoutDiscount.$numberDecimal} KM
                  </h2>
                )}
              </div>
              <div className="d-flex amount_container">
                <Remove
                  fontSize="large"
                  onClick={() => this.onPlusClick(false)}
                />
                <div className="border border-dark amount">
                  {this.state.selectedAmountNumber}
                </div>
                <Add fontSize="large" onClick={() => this.onPlusClick(true)} />
                <button
                  className="btn btn-lg btn-dark me-3 ms-auto btn-hover-white shadow-none"
                  type="button"
                  onClick={() => this.onAddCart()}
                >
                  DODAJ U KORPU
                </button>
              </div>
              {this.state.errorMessage && (
                <div
                  className="alert alert-danger alert-dismissible fade show mt-5 me-3"
                  role="alert"
                >
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    onClick={(e) =>
                      this.setState({
                        ...this.state,
                        errorMessage: null,
                      })
                    }
                  ></button>
                  {this.state.errorMessage}
                </div>
              )}
              {this.state.successMessage && (
                <div
                  className="alert alert-success alert-dismissible fade show mt-5 me-3"
                  role="alert"
                >
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    onClick={(e) =>
                      this.setState({
                        ...this.state,
                        successMessage: null,
                      })
                    }
                  ></button>
                  {this.state.successMessage}
                </div>
              )}
            </div>
          </div>
        </div>
        <Newsletter />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    article: state.articles[ownProps.match.params.id],
    categories: state.categories,
  };
};

export default connect(mapStateToProps, {
  fetchArticle,
  addToCart,
  fetchCategories,
})(Article);

import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { fetchCategories } from "../actions/category";
import { fetchBrands, fetchSizes } from "../actions/article";
import { connect } from "react-redux";
import { changeFilters } from "../actions/filters";

class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: "Sve",
      selectedBrand: "Svi",
      selectedSize: "Svi",
      selectedShow: "Novi Artikli",
    };
  }

  componentDidMount() {
    if (this.props.categories.length === 0) this.props.fetchCategories();
    if (this.props.brands.length === 0) this.props.fetchBrands();
    if (this.props.sizes.length === 0) this.props.fetchSizes();
  }

  renderDropdownCategories() {
    if (!this.props.categories) {
      return <div></div>;
    } else {
      return [{ _id: 1, name: "Sve" }, ...this.props.categories].map(
        (category) => {
          return (
            <Dropdown.Item
              key={category._id}
              onClick={() => this.onClickCategory(category)}
            >
              {category.name}
            </Dropdown.Item>
          );
        }
      );
    }
  }

  onClickCategory = (category) => {
    this.setState({ selectedCategory: category.name });
    if (category.name === "Sve") {
      this.props.changeFilters({ ...this.props.filters, category: undefined });
    } else {
      this.props.changeFilters({
        ...this.props.filters,
        category: category.name,
      });
    }
  };

  renderDropdownBrands() {
    if (!this.props.brands) {
      return <div></div>;
    } else {
      return ["Svi", ...this.props.brands].map((brand) => {
        return (
          <Dropdown.Item key={brand} onClick={() => this.onClickBrand(brand)}>
            {brand}
          </Dropdown.Item>
        );
      });
    }
  }

  onClickBrand = (brand) => {
    this.setState({ selectedBrand: brand });
    if (brand === "Svi") {
      this.props.changeFilters({ ...this.props.filters, brand: undefined });
    } else {
      this.props.changeFilters({ ...this.props.filters, brand: brand });
    }
  };

  renderDropdownNumbers() {
    if (!this.props.sizes) {
      return <div></div>;
    } else {
      return ["Svi", ...this.props.sizes].map((size) => {
        return (
          <Dropdown.Item key={size} onClick={() => this.onClickNumber(size)}>
            {size}
          </Dropdown.Item>
        );
      });
    }
  }

  onClickNumber = (size) => {
    this.setState({ selectedSize: size });
    if (size === "Svi") {
      this.props.changeFilters({ ...this.props.filters, size: undefined });
    } else {
      this.props.changeFilters({ ...this.props.filters, size: size });
    }
  };

  onClickSortingType = (sortingType) => {
    this.setState({ selectedShow: sortingType });
    switch (sortingType) {
      case "Cijena (najniža)": {
        this.props.changeFilters({
          ...this.props.filters,
          sorting: "lower_price",
        });
        break;
      }
      case "Cijena (najviša)": {
        this.props.changeFilters({
          ...this.props.filters,
          sorting: "bigger_price",
        });
        break;
      }
      default: {
        this.props.changeFilters({ ...this.props.filters, sorting: undefined });
        break;
      }
    }
  };

  render() {
    return (
      <div>
        <h1 className="m-5">Artikli</h1>
        <div className="filters row ms-5 me-5">
          <div className="col col col-auto filter gx-3">
            <h5>KATEGORIJA</h5>
            <Dropdown className="dropdown_filter">
              <Dropdown.Toggle
                variant="outline-secondary mb-1 shadow-none"
                size="xs"
              >
                {this.state.selectedCategory}
              </Dropdown.Toggle>
              <Dropdown.Menu variant="dark">
                {this.renderDropdownCategories()}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="col col-auto filter gx-3 ">
            <h5>BRAND</h5>
            <Dropdown className="dropdown_filter">
              <Dropdown.Toggle
                variant="outline-secondary mb-1 shadow-none"
                size="xs"
              >
                {this.state.selectedBrand}
              </Dropdown.Toggle>
              <Dropdown.Menu variant="dark">
                {this.renderDropdownBrands()}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="col col-auto filter gx-3">
            <h5>BROJ</h5>
            <Dropdown className="dropdown_filter">
              <Dropdown.Toggle
                variant="outline-secondary mb-1 shadow-none"
                size="xs"
              >
                {this.state.selectedSize}
              </Dropdown.Toggle>
              <Dropdown.Menu variant="dark">
                {this.renderDropdownNumbers()}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="col col-auto ms-auto filter gx-3 ">
            <h5>SORTIRAJ PO</h5>
            <Dropdown className="dropdown_filter">
              <Dropdown.Toggle
                variant="outline-secondary mb-1 shadow-none"
                size="xs"
              >
                {this.state.selectedShow}
              </Dropdown.Toggle>
              <Dropdown.Menu variant="dark">
                <Dropdown.Item
                  onClick={() => this.onClickSortingType("Cijena (najniža)")}
                >
                  Cijena (najniža)
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => this.onClickSortingType("Cijena (najviša)")}
                >
                  Cijena (najviša)
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => this.onClickSortingType("Novi artikli")}
                >
                  Novi artikli
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    );
  }
}

const makeStateToProps = (state) => {
  return {
    categories: state.categories,
    brands: state.brands,
    filters: state.filters,
    sizes: state.sizes,
  };
};

export default connect(makeStateToProps, {
  fetchCategories,
  fetchBrands,
  changeFilters,
  fetchSizes,
})(Filters);

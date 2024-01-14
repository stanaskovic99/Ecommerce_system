import React from "react";
import { Facebook, Instagram, Pinterest, Twitter } from "@material-ui/icons";
import { connect } from "react-redux";
import { fetchInfo } from "../actions/info";
import { fetchCategories } from "../actions/category";
import { changeFilters } from "../actions/filters";
import { Link } from "react-router-dom";
import Popup from "./Popup";

class Footer extends React.Component {
  componentDidMount() {
    if (this.props.categories.length === 0) this.props.fetchCategories();
    if (Object.keys(this.props.info).length === 0) {
      this.props.fetchInfo("62d50f87caf72949e6a207ae");
    }
  }

  renderLinks() {
    if (this.props.categories.length === 0) {
      return <div></div>;
    } else {
      return [
        ...this.props.categories,
        { _id: "Svi Artikli", name: "Svi Artikli" },
      ].map((category) => {
        return (
          <li key={category._id}>
            <Link
              to="/articles"
              onClick={() => this.onClickFooterLink(category)}
              className="text-decoration-none text-reset li_footer"
            >
              {category.name}
            </Link>
          </li>
        );
      });
    }
  }

  onClickFooterLink = (category) => {
    if (category.name === "Svi Artikli") {
      this.props.changeFilters({
        brand: undefined,
        category: undefined,
        size: undefined,
        search: undefined,
        category: undefined,
      });
    } else {
      this.props.changeFilters({
        brand: undefined,
        category: undefined,
        size: undefined,
        search: undefined,
        category: category.name,
      });
    }
    window.scroll(0, 0);
  };

  renderContacts() {
    if (Object.keys(this.props.info).length === 0) {
      return <p></p>;
    } else {
      return (
        <div>
          <p dangerouslySetInnerHTML={{ __html: this.props.info.address }}></p>
          <p
            dangerouslySetInnerHTML={{ __html: this.props.info.moNumbers }}
          ></p>
          <p dangerouslySetInnerHTML={{ __html: this.props.info.emails }}></p>
        </div>
      );
    }
  }

  renderInfo() {
    if (!this.props.info) {
      return <p></p>;
    } else {
      return (
        <p
          dangerouslySetInnerHTML={{ __html: this.props.info.workingHours }}
        ></p>
      );
    }
  }

  renderSocialMedia() {
    if (
      this.props.info.facebook === "" &&
      this.props.info.twitter === "" &&
      this.props.info.pinterest === "" &&
      this.props.info.instagram === ""
    ) {
      return;
    }

    return (
      <div>
        <h3 className="text-uppercase ">društvene mreže</h3>
        <div className="d-flex ">
          {this.props.info.facebook !== "" && (
            <a
              href={this.props.info.facebook}
              className="d-flex icon_social_media facebook text-white"
            >
              <Facebook />
            </a>
          )}
          {this.props.info.instagram !== "" && (
            <a
              href={this.props.info.instagram}
              className="d-flex icon_social_media instagram text-white"
            >
              <Instagram />
            </a>
          )}
          {this.props.info.twitter !== "" && (
            <a
              href={this.props.info.twitter}
              className="d-flex icon_social_media twitter text-white"
            >
              <Twitter />
            </a>
          )}
          {this.props.info.pinterest !== "" && (
            <a
              href={this.props.info.pinterest}
              className="d-flex icon_social_media pinterest text-white"
            >
              <Pinterest />
            </a>
          )}
        </div>
        <br />
      </div>
    );
  }

  render() {
    return (
      <div className="footer bg-dark">
        <div className="row row-cols-1 row-cols-md-3 row_footer g-0">
          <div className="col g-0 text-white">
            <div className="m-5 ">
              <h3 className="text-uppercase ">kontakt</h3>
              {this.renderContacts()}
            </div>
          </div>
          <div className="col g-0  text-white">
            <div className="m-5 ">
              <h3 className="text-uppercase ">korisni linkovi</h3>
              <ul className="text-capitalize lh-3 ul_footer">
                {this.renderLinks()}
                <li className="li_footer">
                  <Link to="/cart" className="text-decoration-none text-reset">
                    korpa
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col g-0  text-white">
            <div className="m-5 ">
              {this.renderSocialMedia()}
              <h3 className="text-uppercase">info</h3>
              {this.renderInfo()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const makeStateToProps = (state) => {
  return {
    categories: state.categories,
    filters: state.filters,
    info: state.info,
  };
};

export default connect(makeStateToProps, {
  fetchCategories,
  fetchInfo,
  changeFilters,
})(Footer);

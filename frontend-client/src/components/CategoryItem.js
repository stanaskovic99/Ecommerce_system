import React from "react";
import { connect } from "react-redux";
import { changeFilters } from "../actions/filters";
import { Link } from "react-router-dom";

const CategoryItem = (props) => {
  const onClickFooterLink = (name) => {
    props.changeFilters({
      brand: undefined,
      category: undefined,
      size: undefined,
      search: undefined,
      category: props.name,
    });
  };

  return (
    <Link to="/articles" onClick={() => onClickFooterLink(props.name)}>
      <div className="category">
        <img className="img_category" src={props.img} alt="First category" />
        <h4 className="img_name">{props.name}</h4>
      </div>
    </Link>
  );
};

export default connect(null, { changeFilters })(CategoryItem);

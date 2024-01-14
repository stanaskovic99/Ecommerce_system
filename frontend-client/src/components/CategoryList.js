import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCategories } from "../actions/category";
import CategoryItem from "./CategoryItem";

class CategoryList extends React.Component {
  componentDidMount() {
    if (this.props.categories.length === 0) this.props.fetchCategories();
  }

  render() {
    if (this.props.categories.length === 0) {
      return <div className="text-center">Loading...</div>;
    }

    return (
      <div className="category_list">
        <div className="row row-cols-1 row-cols-md-3 gx-0">
          {this.props.categories.map((ctg) => (
            <div key={ctg._id} className="col col_category">
              <CategoryItem img={ctg.srcImage} name={ctg.name} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { categories: state.categories };
};

export default connect(mapStateToProps, { fetchCategories })(CategoryList);

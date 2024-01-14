import React from "react";
import ArticleItem from "./ArticleItem";
import { changeFilters } from "../actions/filters";
import { fetchArticles } from "../actions/article";
import { connect } from "react-redux";
import Popup from "./Popup";

class ArticleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showPopover: false };
  }

  setShowPopover(b) {
    this.setState = { ...this.state, showPopover: b };
  }

  componentDidMount() {
    const params = new URLSearchParams(window.location.search);
    const search = params.get("search");
    const { showHomeArticles, filters } = this.props;

    if (showHomeArticles) {
      this.props.fetchArticles({ home: showHomeArticles });
    } else if (search) {
      this.props.changeFilters({ ...filters, search: search });
    } else {
      this.props.changeFilters({ ...filters });
    }
    this.setShowPopover(true);
  }

  render() {
    const {
      mg,
      rowCols,
      colHeight,
      articleDivHeight,
      articleImgHeight,
      showInfo,
    } = this.props;
    const articleDiv = `article_list_my article_list_mx_${mg}`;
    const rowDiv = `row row-cols-1 row-cols-md-${rowCols} gx-0`;
    const colDiv = `col col_article_height_${colHeight}`;

    return (
      <div className={articleDiv}>
        <div className={rowDiv}>
          {this.props.articles.map((article) => {
            return (
              <div key={article._id} className={colDiv}>
                <ArticleItem
                  divHeight={articleDivHeight}
                  imgHeight={articleImgHeight}
                  showInfo={showInfo}
                  article={article}
                />
              </div>
            );
          })}
        </div>
        <Popup
          showPopover={this.state.showPopover}
          setShowPopover={this.setShowPopover}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    articles: Object.values(state.articles || {}),
    filters: state.filters,
    help: state,
  };
};

export default connect(mapStateToProps, { fetchArticles, changeFilters })(
  ArticleList
);

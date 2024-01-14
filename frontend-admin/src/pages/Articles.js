import React from "react";
import { connect } from "react-redux";
import { deleteArticle, fetchArticles } from "../actions/articles";
import { stringUtcToLocalDateTimeString } from "../utils/helper";
import TablePage from "./TablePage";

const Articles = (props) => {
  const rows = props.articles?.map((item) => {
    const pom = {
      _id: item._id,
      articleId: item.articleId,
      brand: item.brand,
      category: item.category,
      price: item.price.$numberDecimal,
      priceWithoutDiscount: item.priceWithoutDiscount
        ? item.priceWithoutDiscount.$numberDecimal
        : "",
      shownAtHomePage: item.shownAtHomePage,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };

    return pom;
  });

  const cols = [
    // { field: "_id", headerName: "Id", minWidth: 210, flex: 3 },
    { field: "articleId", headerName: "Id artikla", minWidth: 150, flex: 2 },
    { field: "brand", headerName: "Brand", minWidth: 130, flex: 3 },
    { field: "category", headerName: "Kategorija", minWidth: 110, flex: 1 },
    { field: "price", headerName: "Cijena (KM)", minWidth: 100, flex: 2 },
    {
      field: "priceWithoutDiscount",
      headerName: "CBP (KM)",
      minWidth: 90,
      flex: 1,
    },
    {
      field: "shownAtHomePage",
      headerName: "PNPS",
      type: "boolean",
      minWidth: 60,
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Kreiran",
      minWidth: 140,
      flex: 2,
      renderCell: (params) =>
        stringUtcToLocalDateTimeString(params.row.createdAt),
    },
    {
      field: "updatedAt",
      headerName: "Izmjenjen",
      minWidth: 140,
      flex: 2,
      renderCell: (params) =>
        stringUtcToLocalDateTimeString(params.row.updatedAt),
    },
  ];

  const fetchData = () => {
    props.fetchArticles();
  };

  const onDeleteButtonClick = (id) => {
    props.deleteArticle(id);
  };

  const description = () => {
    return (
      <div className="m-3 mb-0 fs-6 ms-4">
        <span className="next-line-bl">CBP - Cijena bez popusta</span>
        <span className="next-line-bl">
          PNPS - Prikazan na početnoj stranici
        </span>
      </div>
    );
  };

  return (
    <TablePage
      cols={cols}
      rows={rows}
      pageSize={13}
      errorFetching={props.errorFetching}
      fetchData={fetchData}
      showNewRowButton={true}
      newRowUrl="/new-article"
      addNewRowButtonName="Dodaj artikal"
      showEditRowButtonWithUrl={true}
      editRowUrl="/edit-article"
      showDescription={true}
      description={description}
      onDeleteButtonClick={onDeleteButtonClick}
      height_79
    />
  );
};

const mapStateToProps = (state) => {
  return {
    articles: Object.values(state.articles || {}),
    errorFetching: state.message?.error,
  };
};

export default connect(mapStateToProps, { fetchArticles, deleteArticle })(
  Articles
);

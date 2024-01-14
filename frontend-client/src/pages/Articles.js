import React, { useEffect } from "react";
import Filters from "../components/Filters";
import ArticleList from "../components/ArticleList";

const Articles = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div>
      <Filters />
      <ArticleList
        mg="25"
        rowCols="4"
        colHeight="21"
        articleDivHeight="90"
        articleImgHeight="100"
      />
    </div>
  );
};

export default Articles;

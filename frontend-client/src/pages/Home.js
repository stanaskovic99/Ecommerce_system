import React, { useEffect } from "react";
import Ad from "../components/Ad";
import CategoryList from "../components/CategoryList";
import ArticleList from "../components/ArticleList";
import Newsletter from "../components/Newsletter";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Ad />
      <div className="section">Kategorije</div>
      <CategoryList />
      <div className="section">Izdvojeni arikli</div>
      <ArticleList
        mg="20"
        rowCols="3"
        colHeight="24"
        articleDivHeight="93"
        articleImgHeight="80"
        showInfo
        showHomeArticles
      />
      <Newsletter />
    </div>
  );
};

export default Home;

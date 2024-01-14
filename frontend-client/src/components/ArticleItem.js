import React from "react";
import { Link } from "react-router-dom";

const ArticleItem = ({ article, divHeight, imgHeight, showInfo }) => {
  return (
    <Link to={`/article/${article._id}`} className="text-decoration-none">
      <div className={`article article_height_${divHeight}`}>
        <img
          className={`img_article img_article_height_${imgHeight}`}
          src={
            article.images.filter((el) => el.isMainImage === true)[0]?.srcImage
          }
          alt="Slika je trenutno nedostupna"
        />
        {showInfo && (
          <div className="info_article bg-dark text-white">
            <div className="ms-2 ">
              <b>{article.brand}</b> <br />
              {article.articleId}
            </div>
            <div className="me-2 mt-3 fw-bold">{`${article.price.$numberDecimal} KM`}</div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ArticleItem;

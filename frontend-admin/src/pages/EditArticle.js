import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import { connect } from "react-redux";
import Popup from "../components/Popup";
import Menu from "../components/Menu";
import Chart from "../components/Chart";
import { fetchArticle, updateArticle } from "../actions/articles";
import { fetchCategories } from "../actions/category";
import _ from "lodash";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import {
  filePondFileToImageObject,
  imageObjectRemap,
  stringUtcToLocalDateTimeString,
} from "../utils/helper";

registerPlugin(FilePondPluginImagePreview, FilePondPluginFileEncode);

const EditArticle = (props) => {
  const { id } = props.match.params;
  const [showPopover, setShowPopover] = useState(false);
  const [files, setFiles] = useState([]);
  const [mainFiles, setMainFiles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({
    name: "Odaberi",
    id: 1,
  });

  useEffect(() => {
    props.fetchArticle(id);
    props.fetchCategories();
    setShowPopover(true);
  }, []);

  const submitArticle = (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);
    let formDataObj = Object.fromEntries(formData.entries());
    let main_image = mainFiles.map((el) => {
      return { ...filePondFileToImageObject(el), isMainImage: true };
    });
    let other_images = [];
    if (formDataObj.deleteOtherImages !== "true") {
      other_images = files.map((el) => {
        return { ...filePondFileToImageObject(el), isMainImage: false };
      });
    }
    formDataObj.images = [...main_image, ...other_images];
    formDataObj = _.omit(formDataObj, "image");
    formDataObj.category = selectedCategory._id;

    const {
      articleId,
      brand,
      category,
      description,
      price,
      priceWithoutDiscount,
      shownAtHomePage,
      images,
      deleteOtherImages,
      ...stock
    } = formDataObj;

    const mappedStock = Object.entries(stock)
      .filter(([k, v]) => v !== "")
      .map(([k, v]) => {
        return {
          size: k,
          amount: v,
        };
      });

    props.updateArticle(
      id,
      articleId,
      brand,
      category,
      description,
      price,
      priceWithoutDiscount,
      shownAtHomePage,
      images,
      deleteOtherImages,
      mappedStock
    );
    setShowPopover(true);
    event.target.reset();
  };

  const renderDropdownCategories = () => {
    if (!props.categories) {
      return <div></div>;
    } else {
      return props.categories.map((category) => {
        return (
          <Dropdown.Item
            key={category._id}
            onClick={() => setSelectedCategory(category)}
          >
            {category.name}
          </Dropdown.Item>
        );
      });
    }
  };

  const mapSizesToFormInput = (categoryName) => {
    return props.categories
      .filter((el) => el.name === categoryName)[0]
      ?.sizes.map((el) => {
        return (
          <Form.Group className="mb-3 col" key={el}>
            <Form.Label className="form-input-title">
              Stanje za veličinu {el}
            </Form.Label>
            <Form.Control
              size="sm"
              type="number"
              placeholder="Unesi stanje"
              name={`${el}`}
            />
          </Form.Group>
        );
      });
  };

  const showStockEdit = () => {
    if (
      (selectedCategory.name === "Odaberi" &&
        isCategoryMultipleSizes(props.article?.category)) ||
      (selectedCategory.name !== "Odaberi" &&
        isCategoryMultipleSizes(selectedCategory.name))
    ) {
      const categoryName =
        selectedCategory.name === "Odaberi"
          ? props.article?.category
          : selectedCategory.name;

      return (
        <React.Fragment>{mapSizesToFormInput(categoryName)}</React.Fragment>
      );
    }

    if (
      (selectedCategory.name === "Odaberi" &&
        !isCategoryMultipleSizes(props.article?.category)) ||
      (selectedCategory.name !== "Odaberi" &&
        !isCategoryMultipleSizes(selectedCategory.name))
    ) {
      return (
        <Form.Group className="mb-3 col">
          <Form.Label className="form-input-title">Stanje</Form.Label>
          <Form.Control
            size="sm"
            type="number"
            placeholder="Unesi stanje"
            name="unisize"
          />
        </Form.Group>
      );
    }
  };

  const isCategoryMultipleSizes = (category) => {
    return props.categories.filter((el) => el.name === category)[0]?.multisize;
  };

  const showStockIfArticleNoSizes = () => {
    if (!isCategoryMultipleSizes(props.article?.category)) {
      return (
        <div className="info-row row row-cols-auto">
          <span className="info-row-name col">Stanje:</span>
          <span className="col overflow-auto">
            {props.article?.stock[0].amount}
          </span>
        </div>
      );
    }
  };

  const showOtherImages = () => {
    let key = 1;
    return props.article?.images
      .filter((el) => el?.isMainImage === false)
      .map((el) => {
        return (
          <img
            className="col overflow-auto image-rect w-150 me-3"
            key={key++}
            src={el?.srcImage}
            title="Neuspješan prikaz slike"
          />
        );
      });
  };

  const showMainImage = () => {
    return (
      <img
        className="image-rect-main"
        src={
          props.article?.images.filter((el) => el?.isMainImage === true)[0]
            ?.srcImage
        }
        title="Neuspješan prikaz slike"
      />
    );
  };

  const formEdit = () => {
    return (
      <Form className="m-2" onSubmit={submitArticle}>
        <div className="row row-cols-auto">
          <Form.Group className="mb-3 col">
            <Form.Label className="form-input-title">Id artikla</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Unesi id"
              name="articleId"
            />
          </Form.Group>
          <Form.Group className="mb-3 col">
            <Form.Label className="form-input-title">Brand</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Unesi brand"
              name="brand"
            />
          </Form.Group>
          <Form.Group className="mb-3 col">
            <Form.Label className="form-input-title ">Kategorija</Form.Label>
            <Dropdown>
              <Dropdown.Toggle
                variant="outline-secondary mb-1 shadow-none dropdown-height"
                size="sm"
              >
                {selectedCategory.name}
              </Dropdown.Toggle>
              <Dropdown.Menu variant="dark">
                {renderDropdownCategories()}
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
          <Form.Group className="mb-3 col">
            <Form.Label className="form-input-title">Cijena (KM)</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Unesi cijenu (pr. 290)"
              name="price"
            />
          </Form.Group>
          <Form.Group className="mb-3 col">
            <Form.Label className="form-input-title">
              Cijena bez Popusta (KM):
            </Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Unesi cijenu bez popusta  (pr. 290)"
              name="priceWithoutDiscount"
            />
          </Form.Group>
          {showStockEdit()}
        </div>
        <div className="row row-cols-auto">
          <Form.Group className="mb-3 col col-12 me-1">
            <Form.Label className="form-input-title">Opis</Form.Label>
            <Form.Control
              size="sm"
              as="textarea"
              placeholder="Unesi opis"
              name="description"
              className="desc-area"
            />
          </Form.Group>
        </div>
        <div className="row row-cols-auto">
          <Form.Group className="mb-3 col">
            <Form.Label className="form-input-title">Glavna slika</Form.Label>
            <div className="row">
              <div className="col">
                <FilePond
                  files={mainFiles}
                  onupdatefiles={setMainFiles}
                  className="filepond--item-my"
                  name="image"
                  labelIdle='Prevucite i ispustite vaše fajlove ili <span class="filepond--label-action">Pretražite</span>'
                />
              </div>
            </div>
          </Form.Group>
          <Form.Group className="mb-3 col">
            <Form.Label className="form-input-title">Sporedne slike</Form.Label>
            <div className="row row-cols-auto">
              <div className="col">
                <FilePond
                  files={files}
                  onupdatefiles={setFiles}
                  maxFiles={4}
                  className="filepond--item-my"
                  maxParallelUploads={4}
                  allowMultiple={true}
                  name="images"
                  labelIdle='Prevucite i ispustite vaše fajlove ili <span class="filepond--label-action">Pretražite</span>'
                />
              </div>
              <div className="col">
                <Form.Check
                  size="sm"
                  type="checkbox"
                  label="Izbriši sve sporedne slike"
                  name="deleteOtherImages"
                  className="me-4 pointer-hover"
                  value={true}
                />
              </div>
            </div>
          </Form.Group>
        </div>
        <div className="row row-cols-1 row-cols-md-2">
          <Form.Group className="mb-3 col">
            <Form.Label className="form-input-title">
              Prikaz na početnoj stranici
            </Form.Label>
            <div className="d-flex">
              <Form.Check
                size="sm"
                type="radio"
                label="Ne"
                name="shownAtHomePage"
                className="me-4 pointer-hover"
                value={false}
              />
              <Form.Check
                size="sm"
                type="radio"
                label="Da"
                name="shownAtHomePage"
                className="me-4 pointer-hover"
                value={true}
              />
            </div>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="button-form-size align-self-end"
          >
            Predaj
          </Button>
        </div>
      </Form>
    );
  };

  const infoEdit = () => {
    return (
      <Card.Body>
        <div className="row row-cols-auto h-100 ">
          <div className="info-row row row-cols-auto col-sm-6 col-12">
            <span className="info-row-name col">Id:</span>
            <span className="col overflow-auto">
              {props.article?.articleId}
            </span>
          </div>
          <div className="info-row row row-cols-auto col-sm-6 col-12">
            <span className="info-row-name col">Brand:</span>
            <span className="col overflow-auto">{props.article?.brand}</span>
          </div>
          <div className="info-row row row-cols-auto col-sm-6 col-12">
            <span className="info-row-name col">Kategorija:</span>
            <span className="col overflow-auto">{props.article?.category}</span>
          </div>
          {showStockIfArticleNoSizes()}
          <div className="info-row row row-cols-auto col-sm-6 col-12">
            <span className="info-row-name col">
              Prikazana na početnoj stranici:
              {props.article?.shownAtHomePage ? (
                <CheckIcon className="ms-1 text-success" />
              ) : (
                <CloseIcon className="ms-1 text-danger" />
              )}
            </span>
          </div>
          <div className="info-row row row-cols-auto col-sm-6 col-12">
            <span className="info-row-name col">Cijena bez popusta:</span>
            <span className="col overflow-auto">
              {props.article?.priceWithoutDiscount?.$numberDecimal}
              {props.article?.priceWithoutDiscount?.$numberDecimal
                ? "KM"
                : "----"}
            </span>
          </div>
          <div className="info-row row row-cols-auto col-sm-6 col-12">
            <span className="info-row-name col">Cijena:</span>
            <span className="col overflow-auto">
              {props.article?.price?.$numberDecimal} KM
            </span>
          </div>
          <div className="info-row row row-cols-auto col-sm-6 col-12">
            <span className="info-row-name col">Kreirano:</span>
            <span className="col overflow-auto">
              {stringUtcToLocalDateTimeString(props.article?.createdAt)}
            </span>
          </div>
          <div className="info-row row row-cols-auto col-sm-6 col-12">
            <span className="info-row-name col">Izmjenjeno:</span>
            <span className="col overflow-auto">
              {stringUtcToLocalDateTimeString(props.article?.updatedAt)}
            </span>
          </div>
          <div className="info-row row row-cols-auto col-12">
            <span className="info-row-name col w-55">Opis:</span>
            <span className="col overflow-auto">
              {props.article?.description ? props.article?.description : "----"}
            </span>
          </div>
        </div>
      </Card.Body>
    );
  };

  const chartStock = () => {
    if (isCategoryMultipleSizes(props.article?.category)) {
      let stock = props.article?.stock?.sort((a, b) => a.size - b.size);
      return (
        <div className="ms-1 row gx-5 w-100">
          <div className="gx-0 mx-0">
            <Chart
              className="m-2 me-1"
              title="Na stanju"
              data={props.article?.stock?.sort((a, b) => a._id - b._id)}
              y={"amount"}
              x={"size"}
              marginX={2}
            />
          </div>
        </div>
      );
    }
  };

  return (
    <div className="container-fluid gx-0 h-100">
      <Menu />
      <div className="main position-absolute">
        <div className="m-3 container-fluid container-create ">
          <div className="ms-2 mb-3">
            <h4>Uređivanje Artikla</h4>
          </div>
          <div className="ms-1 row gx-5 w-100">
            <div className="col col-md-4 col-12 gx-0">
              <div className="gx-0 w-100">
                <Card className="mt-2">{showMainImage()}</Card>
              </div>
            </div>
            <div className="col col-md-8 col-12 gx-0">
              <div className="gx-0 w-100">
                <Card className="ms-md-2 me-md-1 mt-2">{infoEdit()}</Card>
              </div>
            </div>
          </div>
          {chartStock()}
          <div className="ms-1 row gx-5 w-100">
            <div className="gx-0 mx-0">
              <Card className="m-2">
                <div className="m-3 me-5">
                  <h3 className="fs-5 mb-4">Sporedne slike</h3>
                  {showOtherImages()}
                </div>
              </Card>
            </div>
          </div>
          <div className="ms-1 row gx-5 w-100">
            <div className="gx-0 mx-0">
              <Card className="m-2">{formEdit()}</Card>
            </div>
          </div>
        </div>
      </div>
      <Popup showPopover={showPopover} setShowPopover={setShowPopover} />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    article: state.articles[ownProps.match.params.id],
    categories: Object.values(state.categories || {}),
  };
};

export default connect(mapStateToProps, {
  fetchArticle,
  fetchCategories,
  updateArticle,
})(EditArticle);

import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import { connect } from "react-redux";
import Menu from "../components/Menu";
import Popup from "../components/Popup";
import { createArticle } from "../actions/articles";
import { fetchCategories } from "../actions/category";
import _ from "lodash";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import { filePondFileToImageObject } from "../utils/helper";

registerPlugin(FilePondPluginImagePreview, FilePondPluginFileEncode);

const NewArticle = (props) => {
  const [showPopover, setShowPopover] = useState(false);
  const [files, setFiles] = useState([]);
  const [mainFiles, setMainFiles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({
    name: "Odaberi",
    id: 1,
  });

  useEffect(() => {
    props.fetchCategories();
    setShowPopover(true);
  }, []);

  const submitArticle = (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);
    let formDataObj = Object.fromEntries(formData.entries());
    let main_image =
      mainFiles.length != 0
        ? [{ ...filePondFileToImageObject(mainFiles[0]), isMainImage: true }]
        : [];
    let other_images = files.map((el) => {
      return { ...filePondFileToImageObject(el), isMainImage: false };
    });
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
      ...stock
    } = formDataObj;

    const mappedStock = Object.entries(stock).map(([k, v]) => {
      return {
        size: k,
        amount: v,
      };
    });

    props.createArticle(
      articleId,
      brand,
      category,
      description,
      price,
      priceWithoutDiscount,
      shownAtHomePage,
      images,
      mappedStock
    );

    setShowPopover(true);
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
              defaultValue={0}
              placeholder="Unesi stanje"
              name={`${el}`}
            />
          </Form.Group>
        );
      });
  };

  const showStock = () => {
    if (selectedCategory.name === "Odaberi") return <div></div>;
    if (!isCategoryMultipleSizes(selectedCategory.name)) {
      return (
        <Form.Group className="mb-3 col">
          <Form.Label className="form-input-title">Stanje</Form.Label>
          <Form.Control
            size="sm"
            type="number"
            placeholder="Unesi stanje"
            name="unisize"
            defaultValue={0}
          />
        </Form.Group>
      );
    } else {
      return (
        <React.Fragment>
          {mapSizesToFormInput(selectedCategory.name)}
        </React.Fragment>
      );
    }
  };

  const isCategoryMultipleSizes = (categoryName) => {
    return props.categories.filter((el) => el.name === categoryName)[0]
      ?.multisize;
  };

  return (
    <div className="container-fluid gx-0 h-100">
      <Menu />
      <div className="main position-absolute">
        <div className="m-3 container-fluid container-create">
          <div>
            <h4>Novi artikal</h4>
          </div>
          <Card className="mt-4">
            <Form className="m-2 " onSubmit={submitArticle}>
              <div className="row row-cols-auto">
                <Form.Group className="mb-3 col">
                  <Form.Label className="form-input-title">
                    Id artikla
                  </Form.Label>
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
                  <Form.Label className="form-input-title ">
                    Kategorija
                  </Form.Label>
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
                  <Form.Label className="form-input-title">
                    Cijena (KM)
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="Unesi cijenu (pr. 290)"
                    name="price"
                  />
                </Form.Group>
                <Form.Group className="mb-3 col">
                  <Form.Label className="form-input-title">
                    Cijena bez Popusta (KM)
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="Unesi cijenu bez popusta  (pr. 290)"
                    name="priceWithoutDiscount"
                  />
                </Form.Group>
                {showStock()}
              </div>
              <div className="row">
                <Form.Group className="mb-3 col col-12">
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
                <Form.Group className="mb-3 col ">
                  <Form.Label className="form-input-title">
                    Glavna slika
                  </Form.Label>
                  <FilePond
                    files={mainFiles}
                    onupdatefiles={setMainFiles}
                    name="image"
                    className="filepond--item  "
                    labelIdle='Prevucite i ispustite vaš fajl ili <span class="filepond--label-action">Pretražite</span>'
                  />
                </Form.Group>
                <Form.Group className="mb-3 col">
                  <Form.Label className="form-input-title">
                    Sporedne slike
                  </Form.Label>
                  <FilePond
                    files={files}
                    onupdatefiles={setFiles}
                    allowMultiple={true}
                    name="images"
                    className="filepond--item  "
                    labelIdle='Prevucite i ispustite vaše fajlove ili <span class="filepond--label-action">Pretražite</span>'
                  />
                </Form.Group>
              </div>
              <div className="row row-cols-1 row-cols-md-2">
                <Form.Group className="mb-3 col align-self-end">
                  <Form.Check
                    size="sm"
                    type="checkbox"
                    label="Prikaz na početnoj stranici"
                    name="shownAtHomePage"
                    className="me-4 "
                    value={true}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="button-form-size col align-self-end"
                >
                  Predaj
                </Button>
              </div>
            </Form>
          </Card>
        </div>
      </div>
      <Popup showPopover={showPopover} setShowPopover={setShowPopover} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { categories: Object.values(state.categories || {}) };
};

export default connect(mapStateToProps, { fetchCategories, createArticle })(
  NewArticle
);

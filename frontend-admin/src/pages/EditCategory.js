import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { connect } from "react-redux";
import Popup from "../components/Popup";
import Menu from "../components/Menu";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { fetchCategory, updateCategory } from "../actions/category";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import { filePondFileToImageObject } from "../utils/helper";
import { indexOf } from "lodash";

registerPlugin(FilePondPluginImagePreview, FilePondPluginFileEncode);

const EditCategory = (props) => {
  const { id } = props.match.params;
  const [selectedMultisize, setSelectedMultisize] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    props.fetchCategory(id);
  }, []);

  useEffect(() => {
    setSelectedMultisize(props.category?.multisize);
  }, [props.category]);

  const submitCategory = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());
    formDataObj.image =
      files.length !== 0 ? filePondFileToImageObject(files[0]) : undefined;

    console.log(formDataObj);

    const sizes =
      formDataObj.multisize === "true"
        ? formDataObj.sizes
            .split(",")
            .map((el) => el.trim())
            .filter((el) => el !== "")
        : undefined;
    props.updateCategory(
      id,
      formDataObj.name,
      formDataObj.multisize,
      formDataObj.image,
      sizes
    );
    setShowPopover(true);
    event.target.reset();
  };

  const showSizes = (sizes = []) => {
    let text = "";
    sizes.forEach((el) => {
      if (sizes.indexOf(el) > 0) {
        text += ", " + el;
      } else {
        text += el;
      }
    });
    return text;
  };

  return (
    <div className="container-fluid gx-0 h-100">
      <Menu />
      <div className="main position-absolute">
        <div className="m-3 container-fluid container-create">
          <div className="mb-3">
            <h4>Uređivanje Kategorije</h4>
          </div>
          <div className="row">
            <div className="col col-md-4 col-12 m-2">
              <Card>
                <Card.Body>
                  <div className="info-row row row-cols-auto">
                    <span className="info-row-name col">Naziv:</span>
                    <span className="col overflow-auto">
                      {props.category?.name}
                    </span>
                  </div>
                  <div className="info-row row row-cols-auto">
                    <span className="info-row-name col">
                      Ima više veličina:
                    </span>
                    <span className="col overflow-auto">
                      {props.category?.multisize ? (
                        <CheckIcon className="ms-1 text-success" />
                      ) : (
                        <CloseIcon className="ms-1 text-danger" />
                      )}
                    </span>
                  </div>
                  {props.category?.multisize && (
                    <div className="info-row row row-cols-auto">
                      <span className="info-row-name col">Veličine:</span>
                      <span className="col overflow-auto">
                        {showSizes(props.category?.sizes)}
                      </span>
                    </div>
                  )}
                  <div className="info-row mb-0 row row-cols-auto">
                    <span className="info-row-name col">Slika:</span>
                  </div>
                  <div className="info-row mb-0 row row-cols-auto">
                    <img
                      className="col overflow-auto image-rect"
                      src={props.category?.srcImage}
                      title="Neuspješan prikaz slike"
                    />
                  </div>
                </Card.Body>
              </Card>
            </div>
            <div className="col col-md-7 col-12 m-2">
              <Card>
                <Form
                  className="m-2 row row-cols-1 row-cols-xl-2"
                  onSubmit={submitCategory}
                >
                  <Form.Group className="mb-3 col">
                    <Form.Label className="form-input-title">Naziv</Form.Label>
                    <Form.Control
                      size="sm"
                      type="text"
                      placeholder="Unesi novi naziv"
                      name="name"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 col">
                    <Form.Label className="form-input-title">
                      Ima više veličina
                    </Form.Label>
                    <div className="d-flex">
                      <Form.Check
                        size="sm"
                        type="radio"
                        label="Ne"
                        name="multisize"
                        className="me-4 pointer-hover"
                        value={false}
                        onClick={(e) => setSelectedMultisize(false)}
                      />
                      <Form.Check
                        size="sm"
                        type="radio"
                        label="Da"
                        name="multisize"
                        className="me-4 pointer-hover"
                        value={true}
                        onClick={(e) => setSelectedMultisize(true)}
                      />
                    </div>
                  </Form.Group>
                  {selectedMultisize && (
                    <Form.Group className="mb-3 col">
                      <Form.Label className="form-input-title">
                        Veličine
                      </Form.Label>
                      <Form.Control
                        size="sm"
                        type="text"
                        placeholder="Unesi nove veličine (pr. 37,38)"
                        name="sizes"
                      />
                    </Form.Group>
                  )}
                  <Form.Group className="mb-3 col">
                    <Form.Label className="form-input-title">Slika</Form.Label>
                    <FilePond
                      files={files}
                      onupdatefiles={setFiles}
                      name="image"
                      labelIdle='Prevucite i ispustite vaše fajlove ili <span class="filepond--label-action">Pretražite</span>'
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="button-form-size align-self-end"
                  >
                    Predaj
                  </Button>
                </Form>
              </Card>
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
    category: state.categories[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { fetchCategory, updateCategory })(
  EditCategory
);

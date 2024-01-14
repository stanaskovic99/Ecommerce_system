import { React, useState } from "react";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Menu from "../components/Menu";
import Popup from "../components/Popup";
import { createCategory } from "../actions/category";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import { filePondFileToImageObject } from "../utils/helper";

registerPlugin(FilePondPluginImagePreview, FilePondPluginFileEncode);

const NewCategory = (props) => {
  const [showPopover, setShowPopover] = useState(false);
  const [selectedMultisize, setSelectedMultisize] = useState(false);
  const [files, setFiles] = useState([]);

  const submitCategory = (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);
    let formDataObj = Object.fromEntries(formData.entries());
    formDataObj.image =
      files.length !== 0 ? filePondFileToImageObject(files[0]) : undefined;

    const sizes = formDataObj.multisize
      ? formDataObj.sizes
          .split(",")
          .map((el) => el.trim())
          .filter((el) => el !== "")
      : undefined;
    props.createCategory(
      formDataObj.name,
      formDataObj.multisize,
      formDataObj.image,
      sizes
    );
    setShowPopover(true);
  };

  return (
    <div className="container-fluid gx-0 h-100">
      <Menu />
      <div className="main position-absolute">
        <div className="m-3 container-fluid container-create">
          <div>
            <h4>Nova kategorija</h4>
          </div>
          <Card className="mt-4">
            <Form
              className="m-2 row row-cols-1 row-cols-xl-3 row-cols-lg-2"
              onSubmit={submitCategory}
            >
              <Form.Group className="mb-3 col" controlId="form-name">
                <Form.Label className="form-input-title">Naziv</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="Unesi naziv"
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
                  <Form.Label className="form-input-title">Veličine</Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="Unesi nove veličine (pr. 37,38)"
                    name="sizes"
                  />
                </Form.Group>
              )}
              <Form.Group className="mb-3 col" controlId="form-image">
                <Form.Label className="form-input-title">Slika</Form.Label>
                <FilePond
                  files={files}
                  onupdatefiles={setFiles}
                  name="image"
                  className="filepond--item "
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
      <Popup showPopover={showPopover} setShowPopover={setShowPopover} />
    </div>
  );
};

export default connect(null, { createCategory })(NewCategory);

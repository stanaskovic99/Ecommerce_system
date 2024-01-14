import { React, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { connect } from "react-redux";
import Popup from "../components/Popup";
import Menu from "../components/Menu";
import { createAd } from "../actions/ads";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import { filePondFileToImageObject } from "../utils/helper";

registerPlugin(FilePondPluginImagePreview, FilePondPluginFileEncode);

const NewAd = (props) => {
  const [showPopover, setShowPopover] = useState(false);
  const [files, setFiles] = useState([]);

  const submitAd = (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);
    let formDataObj = Object.fromEntries(formData.entries());
    let image = filePondFileToImageObject(files[0]);
    props.createAd(formDataObj.title, formDataObj.decsription, image);
    setShowPopover(true);
  };

  return (
    <div className="container-fluid gx-0 h-100">
      <Menu />
      <div className="main position-absolute">
        <div className="m-3 container-fluid container-create">
          <div>
            <h4>Nova reklama</h4>
          </div>
          <Card className="mt-4">
            <Form
              className="m-2 row row-cols-1 row-cols-lg-2"
              onSubmit={submitAd}
            >
              <Form.Group className="mb-3 col">
                <Form.Label className="form-input-title">Natpis</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="Unesi natpis"
                  name="title"
                />
              </Form.Group>
              <Form.Group className="mb-3 col">
                <Form.Label className="form-input-title">Opis</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="Unesi opis"
                  name="description"
                />
              </Form.Group>
              <Form.Group className="mb-3 col">
                <Form.Label className="form-input-title">Slika</Form.Label>
                <FilePond
                  files={files}
                  onupdatefiles={setFiles}
                  name="image"
                  labelIdle='Prevucite i ispustite vaš fajl ili <span class="filepond--label-action">Pretražite</span>'
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

export default connect(null, { createAd })(NewAd);

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Menu from "../components/Menu";
import Popup from "../components/Popup";
import { fetchAd, updateAd } from "../actions/ads";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import { filePondFileToImageObject } from "../utils/helper";

registerPlugin(FilePondPluginImagePreview, FilePondPluginFileEncode);

const EditAd = (props) => {
  const { id } = props.match.params;
  const [showPopover, setShowPopover] = useState(false);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    props.fetchAd(id);
    setShowPopover(true);
  }, []);

  const submitAd = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());
    var image = filePondFileToImageObject(files[0]);
    props.updateAd(id, formDataObj.title, formDataObj.description, image);
    setShowPopover(true);
    event.target.reset();
  };

  return (
    <div className="container-fluid gx-0 h-100">
      <Menu />
      <div className="main position-absolute">
        <div className="m-3 container-fluid container-create">
          <div className="mb-3">
            <h4>Uređivanje reklame</h4>
          </div>
          <div className="row">
            <div className="col col-md-4 col-12 m-2">
              <Card>
                <Card.Body>
                  <div className="info-row row row-cols-auto">
                    <span className="info-row-name col">Natpis:</span>
                    <span className="col overflow-auto">{props.ad?.title}</span>
                  </div>
                  <div className="info-row row row-cols-auto">
                    <span className="info-row-name col">Opis:</span>
                    <span className="col overflow-auto">
                      {props.ad?.description}
                    </span>
                  </div>
                  <div className="info-row mb-0 row row-cols-auto">
                    <span className="info-row-name col">Slika:</span>
                  </div>
                  <div className="info-row mb-0 row row-cols-auto">
                    <img
                      className="col overflow-auto image-rect "
                      src={props.ad?.srcImage}
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
                  onSubmit={submitAd}
                >
                  <Form.Group className="mb-3 col">
                    <Form.Label className="form-input-title">Natpis</Form.Label>
                    <Form.Control
                      size="sm"
                      type="text"
                      placeholder="Unesi novi natpis"
                      name="title"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 col">
                    <Form.Label className="form-input-title">Opis</Form.Label>
                    <Form.Control
                      size="sm"
                      as="textarea"
                      placeholder="Unesi novi opis"
                      name="description"
                      className="desc-area-info"
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
        </div>
      </div>
      <Popup showPopover={showPopover} setShowPopover={setShowPopover} />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    ad: state.ads[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { fetchAd, updateAd })(EditAd);

import { React, useEffect, useState } from "react";
import { connect } from "react-redux";
import InputGroup from "react-bootstrap/InputGroup";
import { FormGroup } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  Input,
  MultiValue,
  Placeholder,
  SingleValue,
  ValueContainer,
} from "react-select/animated";
import Menu from "../components/Menu";
import Popup from "../components/Popup";
import MySelect from "../components/CustomMultiSelect";
import { fetchNewsletterEmails } from "../actions/newsletters";
import { fetchUsers } from "../actions/users";
import { sendEmail } from "../actions/newsletters";

const animatedComponents = {
  Input,
  MultiValue,
  Placeholder,
  SingleValue,
  ValueContainer,
};

const Email = (props) => {
  useEffect(() => {
    props.fetchNewsletterEmails();
    props.fetchUsers();
    setShowPopover(true);
  }, []);

  const submitEmail = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());

    props.sendEmail(formDataObj);
    setShowPopover(true);
    event.target.reset();
  };

  const [showPopover, setShowPopover] = useState(false);
  const [optionSelected, setOptionSelected] = useState(null);

  const handleChange = (selected) => {
    setOptionSelected(selected);
  };

  return (
    <div className="container-fluid gx-0 h-100">
      <Menu />
      <div className="main position-absolute">
        <div className="m-3 container-fluid container-create">
          <div>
            <h4>Pošalji email</h4>
          </div>
          <Card className="mt-4">
            <Form className="m-2" onSubmit={submitEmail}>
              <div className="row">
                <FormGroup className="mb-3 col col-12 col-sm-6">
                  <InputGroup>
                    <InputGroup.Text>From</InputGroup.Text>
                    <Form.Control
                      size="sm"
                      type="email"
                      name="from"
                      className="fc"
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup className="mb-3 col col-12 col-sm-6">
                  <InputGroup>
                    <InputGroup.Text></InputGroup.Text>
                    <Form.Control size="sm" type="text" name="name" />
                  </InputGroup>
                </FormGroup>
              </div>
              <div className="row row-cols-auto">
                <FormGroup className="mb-3 col col-12">
                  <InputGroup>
                    <InputGroup.Text className="col col-2 col-sm-1">
                      To
                    </InputGroup.Text>
                    <MySelect
                      options={props.emails}
                      isMulti
                      closeMenuOnSelect={false}
                      hideSelectedOptions={false}
                      components={animatedComponents}
                      onChange={handleChange}
                      allowSelectAll={true}
                      value={optionSelected}
                      className="col col-10 col-sm-11"
                      name="to_emails"
                    />
                  </InputGroup>
                </FormGroup>
              </div>

              <InputGroup className="mb-3 col">
                <InputGroup.Text>Subject</InputGroup.Text>
                <Form.Control size="sm" type="text" name="subject" />
              </InputGroup>
              <InputGroup className="mb-3 col ">
                <Form.Control
                  size="sm"
                  as="textarea"
                  placeholder="Message"
                  name="message"
                  className="email-message-area"
                />
              </InputGroup>
              <div className="row">
                <InputGroup className="mb-3 col-sm-4 col-12 ">
                  <InputGroup.Text>Template ID</InputGroup.Text>
                  <Form.Control size="sm" type="text" name="templateId" />
                </InputGroup>
                <Button
                  variant="primary"
                  type="submit"
                  className="mb-3 button-form-size align-self-end"
                >
                  Pošalji
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
  // let emails = state.emails.flatMap((item) => item.email);
  // let users = Object.values(state.users || {}).flatMap((user) => user.email);
  // let allEmails = emails.concat(users);
  // var set = new Set(allEmails);
  // allEmails = Array.from(set);
  return {
    emails:
      state.emails?.map((el) => {
        return {
          label: el,
          value: el,
        };
      }) || [],
  };
};

export default connect(mapStateToProps, {
  sendEmail,
  fetchNewsletterEmails,
  fetchUsers,
})(Email);

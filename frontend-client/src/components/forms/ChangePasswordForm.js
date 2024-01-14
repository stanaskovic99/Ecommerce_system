import { React } from "react";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { changePassword } from "../../actions/users";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Popup from "../Popup";

const ChangePasswordForm = (props) => {
  const onSendClick = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());
    props.changePassword(
      { ...formDataObj, id: props.user._id, email: props.user.email },
      true,
      props.ongoingOrder
    );
    props.setShowPopover(true);
  };

  return (
    <div className="container-login-auth text-bg-light p-3 shadow-lg rounded">
      <div className="text-center icon-forgot-pass mb-3">
        <LockOpenIcon fontSize="large w-100 h-100" />
      </div>

      <Form onSubmit={onSendClick}>
        <Form.Group className="mb-3">
          <Form.Label>Privremena lozinka</Form.Label>
          <Form.Control
            type="password"
            placeholder="Privremena lozinka"
            name="oldPassword"
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Nova lozinka</Form.Label>
          <Form.Control
            type="password"
            placeholder="Nova lozinka"
            name="newPassword"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Ponovi novu lozinku"
            name="confirmNewPassword"
          />
        </Form.Group>

        <Button className="mb-2 w-100" type="submit">
          Potvrdi
        </Button>
      </Form>

      <Popup
        showPopover={props.showPopover}
        setShowPopover={props.setShowPopover}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { changePassword })(ChangePasswordForm);

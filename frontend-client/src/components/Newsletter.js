import React from "react";
import { Send } from "@material-ui/icons";
import Popup from "../components/Popup";
import { connect } from "react-redux";
import { addNewsletter } from "../actions/newsletter";

class Newsletter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputText: "", showPopover: false };
  }

  setShowPopover = (b) => {
    this.setState({ showPopover: b });
  };

  onInputChange = (event) => {
    this.setState({ inputText: event.target.value });
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.addNewsletter(this.state.inputText);
    this.setState({ inputText: "", showPopover: true });
  };

  render() {
    return (
      <div className="newsletter">
        <h1 className="header_newsletter">Newsletter</h1>
        <div className="text_newsletter mb-2">
          Budite obavješteni o svim novim dešavanjima
        </div>
        <form
          className="input-group-sm d-flex mx-auto"
          onSubmit={this.onFormSubmit}
        >
          <input
            type="email"
            placeholder="E-mail"
            value={this.state.inputText}
            className="form-control-xxl input_newsletter"
            onChange={this.onInputChange}
          ></input>
          <button className="input-group-text shadow-none">
            <Send />
          </button>
        </form>
        <Popup
          showPopover={this.state.showPopover}
          setShowPopover={this.setShowPopover}
        />
      </div>
    );
  }
}

export default connect(null, { addNewsletter })(Newsletter);

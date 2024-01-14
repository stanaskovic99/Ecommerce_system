import React, { useEffect, useState } from "react";
import ChangePasswordForm from "../components/forms/ChangePasswordForm";
import ForgotPasswordForm from "../components/forms/ForgotPasswordForm";
import LoginForm from "../components/forms/LoginForm";
import RegistrationForm from "../components/forms/RegistrationForm";

const Authentication = () => {
  const [showPopover, setShowPopover] = useState(false);
  const [showForm, setShowForm] = useState("login");

  const params = new URLSearchParams(window.location.search);
  const ongoingOrder = params.get("ongoingOrder");

  useEffect(() => window.scroll(0, 0));

  return (
    <div className={`${showPopover ? "model-shown-up" : ""}`}>
      {showForm === "registration" && (
        <RegistrationForm
          showPopover={showPopover}
          setShowPopover={setShowPopover}
          setShowForm={setShowForm}
          ongoingOrder={ongoingOrder}
        />
      )}
      {showForm === "login" && (
        <LoginForm
          showPopover={showPopover}
          setShowPopover={setShowPopover}
          registrationPossible={true}
          setShowForm={setShowForm}
          ongoingOrder={ongoingOrder}
        />
      )}
      {showForm === "forgotPassword" && (
        <ForgotPasswordForm
          showPopover={showPopover}
          setShowPopover={setShowPopover}
          setShowForm={setShowForm}
        />
      )}
      {showForm === "changePassword" && (
        <ChangePasswordForm
          showPopover={showPopover}
          setShowPopover={setShowPopover}
          setShowForm={setShowForm}
          ongoingOrder={ongoingOrder}
        />
      )}
    </div>
  );
};

export default Authentication;

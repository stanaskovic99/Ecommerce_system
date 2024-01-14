import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  deletePaymentIntent,
  confirmPaymentIntent,
} from "../../actions/stripe";
import Popup from "../Popup";

const startValue_addressOptions = {
  mode: "shipping",
  allowedCountries: ["BA", "HR", "RS"],
  fields: {
    phone: "always",
  },
  validation: {
    phone: {
      required: "always",
    },
  },
  defaultValues: {
    address: {
      state: "BA",
    },
  },
};

const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [showPopover, setShowPopover] = useState(false);
  const [addressOptions, setAddressOptions] = useState(
    startValue_addressOptions
  );
  const [billingDetails, setBillingDetails] = useState(null);

  const paymentOptions = {
    layout: "tabs",
    fields: {
      billingDetails: "never",
    },
  };

  useEffect(() => {
    if (!props.user) return;

    setAddressOptions({
      ...addressOptions,
      defaultValues: {
        name: props.user.fullName,
      },
    });
  }, []);

  const onSubmitClick = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const billingDetailsWithEmail = {
      email: props.user.email,
      ...billingDetails,
    };
    if (props.user) {
      props.confirmPaymentIntent(
        stripe,
        elements,
        billingDetailsWithEmail,
        props.user._id
      );
    }
    setShowPopover(true);
  };

  const onCancelPayment = (event) => {
    event.preventDefault();
    props.deletePaymentIntent(props.paymentId);
  };

  return (
    <div>
      <button
        className="btn btn-outline-primary btn-sm mb-3"
        onClick={onCancelPayment}
      >
        Vrati se nazad
      </button>
      <form className="form-stripe" onSubmit={onSubmitClick}>
        <PaymentElement
          class="payment-element w-100"
          options={paymentOptions}
        />
        <AddressElement
          options={addressOptions}
          onChange={(event) => {
            setBillingDetails(event.value);
          }}
        />
        <button
          disabled={!stripe || !elements}
          className="btn btn-primary w-100 mt-4 btn-lg"
        >
          Uplati
        </button>
        <Popup showPopover={showPopover} setShowPopover={setShowPopover} />
      </form>
    </div>
  );
};

export default connect(null, { deletePaymentIntent, confirmPaymentIntent })(
  CheckoutForm
);

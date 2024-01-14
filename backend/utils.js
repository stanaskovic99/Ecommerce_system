const mapAddress = (addressObject) => {
  let address = "";
  if (addressObject.streetAndNumber) {
    address += addressObject.streetAndNumber;
  }
  if (addressObject.city) {
    address += ", " + addressObject.city;
  }
  if (addressObject.postalCode) {
    address += ", " + addressObject.postalCode;
  }
  if (addressObject.country) {
    address += ", " + addressObject.country;
  }
  if (addressObject.additionalInfo) {
    address += " (" + addressObject.additionalInfo + ")";
  }
  return address;
};

const errorFormatter = (error) => {
  let errorMessage = "";

  const allErrors = error.message
    .substring(error.message.indexOf(":") + 1)
    .trim();
  const allErrorsArray = allErrors.split(",").map((err) => err.trim());
  allErrorsArray.forEach((error) => {
    const [k, v] = error.split(":").map((err) => err.trim());
    errorMessage += " " + v;
  });
  return errorMessage;
};

const percentToLastMonth = (valueLastMonth, valueCurrentMonth) => {
  if (valueLastMonth == null) {
    valueLastMonth = 0;
  }
  if (valueCurrentMonth == null) {
    valueCurrentMonth = 0;
  }

  let diff = valueCurrentMonth - valueLastMonth;
  let divider = valueLastMonth;
  if (divider < 0) divider *= -1;
  let pom = (diff / divider).toFixed(4);
  return pom * 100;
};

module.exports = { mapAddress, errorFormatter, percentToLastMonth };

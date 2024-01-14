import React from "react";
import { MuiColorInput } from "mui-color-input";

const ColorPicker = () => {
  const [value, setValue] = React.useState("#ffffff");

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return <MuiColorInput value={value} onChange={handleChange} />;
};

export default ColorPicker;

import React from "react";
import { default as ReactSelect } from "react-select";

const defaultAllOption = {
  label: "Pošalji svim pretplaćenim korisnicima",
  value: "*",
};

const MySelect = (props) => {
  const { allOption = defaultAllOption } = props;
  if (props.allowSelectAll) {
    return (
      <ReactSelect
        {...props}
        options={[allOption, ...props.options]}
        onChange={(selected) => {
          if (
            selected != null &&
            selected.length > 0 &&
            selected[selected.length - 1].value === allOption.value
          ) {
            return props.onChange(props.options);
          }
          return props.onChange(selected);
        }}
      />
    );
  }

  return <ReactSelect {...props} />;
};

export default MySelect;

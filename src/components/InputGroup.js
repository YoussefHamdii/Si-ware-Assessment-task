import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const InputGroup = (props) => {
  const changeHandler = (event, newValue) => {
    if (newValue) {
      if (props.inputName === "country") {
        props.stateSetter(newValue);
      } else {
        props.stateSetter({
          ...props.state,
          [props.inputName]: newValue,
        });
      }
    } else {
      props.stateSetter({
        ...props.state,
        [props.inputName]: event.target.value,
      });
    }
  };

  if (props.inputType === "autoComplete") {
    return (
      <div>
        <label for="name">{props.labelName}</label>
        <Autocomplete
          value={props.inputValue}
          options={props.options}
          className="dropdown"
          onChange={(event, newvalue) => changeHandler(event, newvalue)}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={props.placeholder}
              size="small"
              value={props.inputValue}
            />
          )}
        />
      </div>
    );
  } else {
    return (
      <div>
        <label for="name">{props.labelName}</label>
        <input
          disabled={props.disabled}
          type={props.inputType}
          placeholder={props.placeholder}
          name={props.inputName}
          className="input-field"
          value={props.inputValue}
          onChange={(e) => changeHandler(e)}
        />
      </div>
    );
  }
};

export default InputGroup;

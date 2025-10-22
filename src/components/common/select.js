import React, { useState,useEffect } from "react";
import { CFormSelect, CFormLabel } from "@coreui/react";


function SimpleSelect(props) {
  const [isFocused, setIsFocused] = useState(false);

  const {
    value = "",
    onChange = () => {},
    style = {},
    disabled,
    options = [],
    valueAccessor = "value",
    keyAccessor = "key",
    name = "",
    error,
    labelClassName="",
    title="",
    required = false, 
  } = props;


  console.log(error,"errorSelect");


  

  return (
    <div style={{ ...style}} >
        {title ? (
        <CFormLabel  className="mb-0">
          {title}
          {required ? <span style={{ color: "red" }}> *</span> : null}
        </CFormLabel>
      ) : null}
    <CFormSelect
      aria-label="Default select example"
      onChange={onChange}
      value={value}
      name={name}
      onFocus={() => setIsFocused(true)}
      style={{
        fontSize: "14px",
        color: "black",
        height: "40px",
        border: "1px solid",
        borderRadius: "5px",
        borderColor:  "#D8D8D8",
        boxShadow: "none",
      }}
    >
      {options?.map((item, index) => (
        <option key={index} value={item[valueAccessor]}>
          {item[keyAccessor]}
        </option>
      ))}

    </CFormSelect>
    {error ? (
        <CFormLabel className="simple-select-error" style={{color:"#dc3545"}} >
          {error}
        </CFormLabel>
      ) : null}
    </div>
  );
}

export default SimpleSelect;

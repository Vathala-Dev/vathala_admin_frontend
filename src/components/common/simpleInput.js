import React, { useState } from "react";

import { CForm,CFormInput,CFormLabel, CFormTextarea } from '@coreui/react';

function SimpleInput(props) {


  const {
    placeholder = "",
    value = "",
    onChange = () => {},
    name = "",
    groupClassName = "",
    style = {},
    type = "",
    title= "",
    disabled,
    ref,
    textArea = false,
    required = false,
    verify,
    labelStyle={},
    error
  } = props;


  console.log(error,"error");

  return (
    <div
      className={groupClassName}
      style={{ position: "relative", ...style }}
    >

        {title &&
        <CFormLabel style={labelStyle} className="mb-1 fw-bolder" >{title}</CFormLabel>
        }
      {required ? <span style={{ color: "red" }}> * </span> : null}

      {!textArea ? (
        <CFormInput
          style={{
            fontSize: "14px",
            color: "black",
            height: "40px",
            border: "1px solid",
            borderRadius: "5px",
            borderColor: error ? "#e55353"  : "#D8D8D8",
          }}
          placeholder={placeholder}
          onChange={onChange}
         ref={ref}
          value={value}
          name={name}
          type={type}
          disabled={disabled}
        />
      ) : (
        <CFormTextarea
        style={{
          fontSize: "14px",
          color: "black",
          
          border: "1px solid",
          borderRadius: "5px",
          borderColor: error ? "#e55353" : "#D8D8D8",
        }}
        placeholder={placeholder}
        onChange={onChange}
       rows={5}
     
        value={value}
        name={name}
        type={type}
        disabled={disabled}
      />
      )}

     
{error ? (
        <CFormLabel className="simple-select-error" style={{color:"#dc3545"}} >
          {error}
        </CFormLabel>
      ) : null}
    </div>
  );
}

export default SimpleInput;

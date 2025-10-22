import React, { useState } from "react";

import { CForm,CFormInput,CFormLabel, CFormTextarea } from '@coreui/react';

function SimpleDatePicker(props) {


  const {
    placeholder = "",
    value = "",
    onChange = () => {},
    name = "",
    groupClassName = "",
    style = {},
    min= "",
    max="",
    title= "",
    disabled,

    required = false,
    
    error
  } = props;


  console.log(error,"error");

  return (
    <div
      className={groupClassName}
      style={{ position: "relative", ...style }}
    >

        {title &&
        <CFormLabel className="mb-1 fw-bolder" >{title}</CFormLabel>
        }
      {required ? <span style={{ color: "red" }}> * </span> : null}

     
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
         min={min}
         max={max}
          value={value}
          name={name}
          type="date"
          disabled={disabled}
        />
      

     
{error ? (
        <CFormLabel className="simple-select-error" style={{color:"#dc3545"}} >
          {error}
        </CFormLabel>
      ) : null}
    </div>
  );
}

export default SimpleDatePicker;

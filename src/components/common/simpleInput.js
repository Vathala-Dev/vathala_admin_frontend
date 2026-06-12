import React from "react";
import { CFormInput, CFormLabel, CFormTextarea, CFormSelect } from '@coreui/react';

function SimpleInput(props) {

  const {
    placeholder = "",
    value = "",
    onChange = () => { },
    name = "",
    groupClassName = "",
    style = {},
    type = "text",
    title = "",
    disabled,
    ref,
    textArea = false,
    required = false,
    labelStyle = {},
    error,

    // ⭐ NEW
    options = [],
    select = false

  } = props;

  return (
    <div className={groupClassName} style={{ position: "relative", ...style }}>

      {title && (
        <CFormLabel style={labelStyle} className="mb-1 fw-bolder">
          {title}
          {required && <span style={{ color: "red" }}> *</span>}
        </CFormLabel>
      )}

      {/* INPUT MODE */}
      {!textArea && !select && (
        <CFormInput
          style={{
            fontSize: "14px",
            color: "black",
            height: "40px",
            borderRadius: "5px",
            border: "1px solid",
            borderColor: error ? "#e55353" : "#D8D8D8",
          }}
          placeholder={placeholder}
          onChange={onChange}
          ref={ref}
          value={value}
          name={name}
          type={type}
          disabled={disabled}
        />
      )}

      {/* TEXTAREA MODE */}
      {textArea && (
        <CFormTextarea
          style={{
            fontSize: "14px",
            color: "black",
            borderRadius: "5px",
            border: "1px solid",
            borderColor: error ? "#e55353" : "#D8D8D8",
          }}
          placeholder={placeholder}
          onChange={onChange}
          rows={5}
          value={value}
          name={name}
          disabled={disabled}
        />
      )}

      {/* ⭐ SELECT MODE */}
      {select && (
        <CFormSelect
          style={{
            fontSize: "14px",
            height: "40px",
            borderRadius: "5px",
            border: "1px solid",
            borderColor: error ? "#e55353" : "#D8D8D8",
          }}
          value={value}
          onChange={onChange}
          disabled={disabled}
        >
          {options.map((opt, i) => (
            <option key={i} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </CFormSelect>
      )}

      {/* ERROR */}
      {error && (
        <CFormLabel style={{ color: "#dc3545", fontSize: "12px" }}>
          {error}
        </CFormLabel>
      )}

    </div>
  );
}

export default SimpleInput;

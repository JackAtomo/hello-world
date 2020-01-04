import React from "react";

const isFieldValid = (name, errors, formState) => {
  return errors[name] ? "ko" : formState.touched.includes(name) && "ok";
};

function Field({
  name,
  label,
  type,
  errors,
  placeholder,
  formState,
  validations
}) {
  return (
    <div className={`form-control ${isFieldValid(name, errors, formState)}`}>
      <label>{label}</label>
      <input
        ref={validations}
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
      />
      <span className="errorMessage">
        {errors[name] && errors[name].message}
      </span>
    </div>
  );
}

export { Field };

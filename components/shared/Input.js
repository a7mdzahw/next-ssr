import React from "react";

const Input = ({ label, name, value, onChange, error, apiError, ...props }) => {
  return (
    <div className="form-floating my-2">
      <input
        name={name}
        id={name}
        value={value}
        type="text"
        onChange={onChange}
        {...props}
        autoFocus={error}
        className={error || apiError ? "border border-danger form-control" : "form-control"}
      />
      <label htmlFor={name}>{label}</label>
      {error && <p className="text-danger">{error}</p>}
      {apiError && <p className="text-danger">{apiError.description}</p>}
    </div>
  );
};

export default Input;

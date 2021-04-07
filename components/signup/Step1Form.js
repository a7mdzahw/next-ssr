import React, { useState } from "react";

import Input from "../shared/Input";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import countries from "../../lib/country";
import getError from "../../lib/getError";
import getApiError from "../../lib/getApiError";

const Step1Form = ({ error, body, apiErrors, phoneError }) => {
  const apiPhoneErr = getApiError(apiErrors, "Phone");
  const apiCountryErr = getApiError(apiErrors, "Country");
  const [data, setData] = useState({ ...body });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <form action="/signup1" method="POST" noValidate>
      <Input name="fullName" type="text" label="Full Name" error={getError(error, "fullName")} value={data.fullName || ""} onChange={handleChange} />

      <label htmlFor="countryCode">Country</label>
      <select name="countryCode" className="form-select form-select-lg my-3" value={data.countryCode || "EG"} onChange={handleChange}>
        {countries.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>
      {apiCountryErr && <p className="text-danger mt-1">{apiCountryErr.description}</p>}

      <div className=" mb-3">
        <PhoneInput
          country={(data.countryCode && data.countryCode.toLowerCase()) || "eg"}
          name="phone"
          value={data.phone}
          onChange={(phone) => setData({ ...data, phone })}
          inputProps={{
            name: "phone",
            style: { width: "100%" },
            required: true,
            className: phoneError ? "form-control border border-danger" : "form-control",
          }}
        />
        {phoneError && <p className="text-danger mt-1">Wrong Phone Format</p>}
        {apiPhoneErr && <p className="text-danger mt-1">{apiPhoneErr.description}</p>}
      </div>
      <button className="btn btn-primary d-block w-100">Submit</button>
      <noscript>
        <div className="alert alert-warning mt-2">
          <img src="/delet_trai_acc.svg" alt="alert" className="me-2" />
          Please enable javascript for better experience
        </div>
      </noscript>
    </form>
  );
};

export default Step1Form;

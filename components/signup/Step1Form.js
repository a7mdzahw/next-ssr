import React, { useState } from "react";

import Input from "../shared/Input";
import PhoneInput from "react-phone-input-2";
import countries from "../../lib/country";
import getError from "../../lib/getError";

const Step1Form = ({ error, body }) => {
  const [data, setData] = useState({ ...body });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <form action="/signup1" method="POST" noValidate>
      <Input name="fullName" type="text" label="Full Name" error={getError(error, "fullName")} value={data.fullName} onChange={handleChange} />

      <select name="countryCode" className="form-select form-select-lg my-3">
        {countries.map((country) => (
          <option key={country.name} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>

      <div className=" mb-3">
        <PhoneInput
          name="phone"
          inputProps={{
            name: "phone",
            style: { width: "100%" },
            required: true,
            autoFocus: true,
          }}
        />
      </div>
      <button className="btn btn-primary d-block w-100">Submit</button>
    </form>
  );
};

export default Step1Form;

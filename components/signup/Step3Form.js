import React, { useState } from "react";
import getApiError from "../../lib/getApiError";
import getError from "../../lib/getError";

import Input from "../shared/Input";

const Step3Form = ({ error, body, apiErrors }) => {
  const [data, setData] = useState({ ...body });
  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  return (
    <form action="/signup3" method="POST" noValidate>
      <Input
        name="companyName"
        label="Company Name"
        value={data.companyName}
        onChange={handleChange}
        error={getError(error, "companyName")}
        apiError={getApiError(apiErrors, "Company Name")}
      />
      <Input
        name="subDomain"
        label="Subdomain Suggestion"
        value={data.subDomain}
        onChange={handleChange}
        error={getError(error, "subDomain")}
        apiError={getApiError(apiErrors, "SubDomain")}
      />
      <Input
        name="email"
        label="Email Address"
        value={data.email}
        onChange={handleChange}
        error={getError(error, "email")}
        apiError={getApiError(apiErrors, "Email")}
      />
      <Input
        name="password"
        label="Password"
        type="password"
        value={data.password}
        onChange={handleChange}
        error={getError(error, "password")}
        apiError={getApiError(apiErrors, "Password")}
      />
      <Input
        name="confirmpassword"
        label="Confirm Password"
        value={data.confirmpassword}
        onChange={handleChange}
        error={getError(error, "confirmpassword")}
      />
      <button className="btn btn-primary d-block w-100">Let's Go</button>
    </form>
  );
};

export default Step3Form;

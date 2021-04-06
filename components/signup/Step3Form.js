import React from "react";

import Input from "../shared/Input";

const Step3Form = () => {
  return (
    <form action="/signup3" method="POST" noValidate>
      <Input name="companyName" label="Company Name" />
      <Input name="subDomain" label="Subdomain Suggestion" value={data.subDomain} />
      <Input name="emailAddress" label="Email Address" value={data.emailAddress} />
      <Input name="password" label="Password" type="password" />
      <Input name="confirmpassword" label="Confirm Password" value={data.confirmpassword} />
      <button className="btn btn-primary d-block w-100">Let's Go</button>
    </form>
  );
};

export default Step3Form;

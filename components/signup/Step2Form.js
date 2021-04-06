import React from "react";

import Input from "../shared/Input";

const Step2Form = () => {
  return (
    <form action="/signup2" method="POST">
      <Input type="text" name="verifyCode" label="Verfiy Code" />
      <button className="btn btn-primary d-block w-100">Submit</button>
    </form>
  );
};

export default Step2Form;

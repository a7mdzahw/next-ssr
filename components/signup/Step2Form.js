import React from "react";
import getError from "../../lib/getError";

import Input from "../shared/Input";

const Step2Form = ({ error }) => {
  return (
    <form action="/signup2" method="POST">
      <Input type="text" name="verifyCode" label="Verfiy Code" error={getError(error, "verifyCode")} />
      <button className="btn btn-primary d-block w-100">Submit</button>
    </form>
  );
};

export default Step2Form;

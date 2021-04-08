import React from "react";
import Link from "next/link";
import getApiError from "../../lib/getApiError";
import getError from "../../lib/getError";

import Input from "../shared/Input";

const Step2Form = ({ error, apiErrors }) => {
  return (
    <>
      <form action="/signup2" method="POST">
        <Input
          type="text"
          name="verifyCode"
          label="Verfiy Code"
          error={getError(error, "verifyCode")}
          apiError={getApiError(apiErrors, "VerifyCode")}
        />
        <button className="btn btn-primary d-block w-100">Submit</button>
      </form>
      <Link href="/signup/finish">
        <a className="btn btn-primary">Skip</a>
      </Link>
    </>
  );
};

export default Step2Form;

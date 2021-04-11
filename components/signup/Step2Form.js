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
        <div className="row align-items-center ms-1">
          <button className="btn Rectangle-608 log-in col-8">Verify</button>
          <span className="col-4 time">00:01:30</span>
        </div>
      </form>

      <Link href="/signup/finish">
        <a className="btn btn-primary mt-4">Skip</a>
      </Link>
    </>
  );
};

export default Step2Form;

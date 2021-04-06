import React from "react";
import Link from "next/link";

import Step1Form from "./Step1Form";
import Step2Form from "./Step2Form";
import Step3Form from "./Step3Form";

const SignupForm = ({ step, error, body }) => {
  return (
    <div style={{ minWidth: 400 }}>
      {step === 1 && <Step1Form error={error} body={body} />}
      {step === 2 && <Step2Form error={error} body={body} />}
      {step === 3 && <Step3Form error={error} body={body} />}
      <div className="mt-2 text-center">
        aleardy have an account?{" "}
        <Link className="text-primary fw-bold text-decoration-none" href="/login">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default SignupForm;

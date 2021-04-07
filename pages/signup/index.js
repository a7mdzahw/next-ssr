import React from "react";
import Head from "next/head";
import Signuplayout from "../../components/signup/SignupLayout";
import Step1Form from "../../components/signup/Step1Form";

import http from "../../lib/clientHttp";

const Signup = ({ step, error }) => {
  const errObj = JSON.parse(error);
  return (
    <div className="container">
      <Head>
        <title>Sign Up</title>
      </Head>
      <Signuplayout step={step}>
        <Step1Form error={errObj.error} body={errObj.body} apiErrors={errObj.apiErrors} phoneError={errObj.phoneError} />
      </Signuplayout>
    </div>
  );
};

export const getServerSideProps = async ({ req, res, query }) => {
  if (req.cookies.token) {
    return {
      redirect: {
        destination: "/",
        fallback: "blocking",
      },
    };
  }

  const { data } = await http.post("/signup");
  return { props: { step: query.step || data.step, error: JSON.stringify(query) } };
};

export default Signup;

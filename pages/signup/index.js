import React from "react";
import Head from "next/head";
import Signuplayout from "../../components/signup/SignupLayout";
import Step1Form from "../../components/signup/Step1Form";

import http from "../../lib/clientHttp";

const Signup = ({ step, error, js }) => {
  const errObj = JSON.parse(error);
  return (
    <div className="container">
      <Head>
        <title>Sign Up</title>
      </Head>
      <Signuplayout step={step}>
        <Step1Form error={errObj.error} body={errObj.body} apiErrors={errObj.apiErrors} phoneError={errObj.phoneError} js={js} />
      </Signuplayout>
    </div>
  );
};

export const getServerSideProps = async ({ req, res, query }) => {
  // checking login state and redirect if logged in
  if (req.cookies.token) {
    return {
      redirect: {
        destination: "/",
        fallback: "blocking",
      },
    };
  }
  // fetching current step from server
  const { data } = await http.post("/signup");
  return { props: { step: query.step || data.step, error: JSON.stringify(query), js: query.js || "true" } };
};

export default Signup;

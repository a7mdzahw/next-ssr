import React from "react";
import Head from "next/head";

import Signuplayout from "../../components/signup/SignupLayout";
import Step2Form from "../../components/signup/Step2Form";

import http from "../../lib/clientHttp";

const Signup = ({ step, error }) => {
  const errObj = JSON.parse(error);
  return (
    <div className="container">
      <Head>
        <title>Verify Code</title>
      </Head>
      <div className="container d-flex justify-content-around align-items-center" style={{ height: "75vh" }}>
        <Signuplayout step={step}>
          <Step2Form error={errObj.error} body={errObj.body} />
        </Signuplayout>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ query }) => {
  const { data } = await http.post("/signup", { step: 2 });
  return { props: { step: query.step || data.step, error: JSON.stringify(query) } };
};

export default Signup;

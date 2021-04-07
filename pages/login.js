import React from "react";
import Head from "next/head";

import LoginForm from "../components/login/LoginForm";
import http from "../lib/clientHttp";

const Login = ({ error }) => {
  const errObj = JSON.parse(error);
  return (
    <div className="container">
      <Head>
        <title>Login</title>
      </Head>
      <div className="container d-flex justify-content-around align-items-center" style={{ height: "75vh" }}>
        <h1 className="display-6 fw-bold">
          SET UP YOUR FREE <br /> TRIAL OF{" "}
          <span className="text-primary">
            DE <strong className="text-warning">X</strong> EF
          </span>
        </h1>

        <LoginForm error={errObj.error} body={errObj.body} />
      </div>
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
  try {
    const { data } = await http.post("/LoginRequest");
    const token = data.token;
    res.cookie("dexefForgeryKey", token);

    return {
      props: { token, error: JSON.stringify(query) || null },
    };
  } catch {
    return { props: { error: JSON.stringify(query) || null } };
  }
};

export default Login;

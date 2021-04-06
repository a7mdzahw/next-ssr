import React from "react";
import SignUpForm from "../components/signup/SignupForm";
import http from "../lib/clientHttp";

const Signup = ({ step, error }) => {
  const errObj = JSON.parse(error);
  return (
    <div className="container">
      <div className="container d-flex justify-content-around align-items-center" style={{ height: "75vh" }}>
        <div className="title">
          <h1 className="display-6 fw-bold">
            SET UP YOUR FREE <br /> TRIAL OF{" "}
            <span className="text-primary">
              DE <strong className="text-warning">X</strong> EF
            </span>
          </h1>
          <ul className="nav nav-pills gap-3 mt-3">
            <li className="nav-item">
              <a className={step === 1 ? "nav-link active" : "nav-link"} aria-current="page">
                1
              </a>
            </li>
            <li className="nav-item">
              <a className={step === 2 ? "nav-link active" : "nav-link"} aria-current="page">
                2
              </a>
            </li>
            <li className="nav-item">
              <a className={step === 3 ? "nav-link active" : "nav-link"} aria-current="page">
                3
              </a>
            </li>
          </ul>
        </div>
        <SignUpForm step={step} error={errObj.error} body={errObj.body} />
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ req, res, query }) => {
  const { data } = await http.post("/signup");
  return { props: { step: data.step, error: JSON.stringify(query) } };
};

export default Signup;

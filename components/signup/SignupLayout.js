import React from "react";

const Signuplayout = ({ step, children }) => {
  function content() {
    switch (step) {
      case 1:
        return (
          <h1 className="display-6 fw-bold">
            SET UP YOUR FREE <br /> TRIAL OF{" "}
            <span className="text-primary">
              DE <strong className="text-warning">X</strong> EF
            </span>
          </h1>
        );
        break;
      case 2:
        return <h1 className="display-6 fw-bold">ENTER THE 5-DIGIT CODE FROM YOUR SMS</h1>;
        break;
      case 3:
        return <h1 className="display-6 fw-bold">FINISH YOUR SIGN UP HERE</h1>;
        break;
      default:
        break;
    }
  }
  return (
    <div className="container d-flex justify-content-around align-items-center" style={{ height: "75vh" }}>
      <div className="title">
        <div style={{ maxWidth: 450 }}>{content()}</div>
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
      <div style={{ minWidth: 400 }}>{children}</div>
    </div>
  );
};

export default Signuplayout;

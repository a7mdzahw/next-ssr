import React, { useState } from "react";
import Link from "next/link";

import Input from "../shared/Input";
import getError from "../../lib/getError";

const LoginForm = ({ error, body }) => {
  const [data, setData] = useState({ ...body });
  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });
  return (
    <form action="/login" method="POST" noValidate style={{ minWidth: 400, maxWidth: 600 }}>
      <Input name="email" label="Email" type="email" placeholder="add mail" error={getError(error, "email")} value={data.email} onChange={handleChange} />
      <Input name="password" label="Password" type="password" error={getError(error, "password")} value={data.password} onChange={handleChange} />

      <div className="form-check mt-3">
        <input type="checkbox" name="stayloggedin" id="stayloggedin" className="form-check-input" />
        <label htmlFor="stayloggedin" className="form-check-label">
          Stay Logged In
        </label>
      </div>

      <button className="btn btn-primary d-block w-100 my-2">Log In</button>
      <div className="mt-2 text-center">
        don't have an account yet ?{" "}
        <Link className="text-primary fw-bold text-decoration-none" href="/signup">
          sign up
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
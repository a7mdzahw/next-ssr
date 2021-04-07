import React from "react";
import Link from "next/link";

const Navbar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand">
      <div className="container">
        <Link href="/">
          <a className="navbar-brand fs-3 fw-bold">
            DE<strong className="text-warning"> X </strong>EF
          </a>
        </Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link href="/">
              <a className="nav-link">Home</a>
            </Link>
          </li>
          {!user && (
            <>
              <li className="nav-item">
                <Link href="/login">
                  <a className="nav-link"> Login</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/signup">
                  <a className="nav-link">sign up</a>
                </Link>
              </li>
            </>
          )}
          {user && (
            <li className="nav-item">
              <Link href="/logout">
                <a className="nav-link">logout</a>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

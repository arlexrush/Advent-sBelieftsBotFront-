import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Fragment>
      <nav className="navbar row navbar-custom">
        <div className="col-12 col-md-3">
          <div className="navbar-brand" to={`/`}>
            <Link className="btn btn-block" to={`/`}>
              <img src="../LogoIgnakee.png" className="logo" alt="Logo" />
            </Link>
          </div>
        </div>
        <div class="text-center mx-auto">
          <h1 class="mx-auto my-4">Converter PDFs to TXT files App</h1>
          <h2 class="mx-auto my-3">
            Preprocessing Data for ML and AI Projects
          </h2>
        </div>
        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <Link className="btn mr-2 mr-md-4" id="login_btn">
            <i className="fa fa-user-circle"></i> Login
          </Link>
          <Link to="/register" className="btn btn-primary">
            <i className="fa fa-user-plus"></i> Register
          </Link>
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;

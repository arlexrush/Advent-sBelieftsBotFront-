import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";


const Header = () => {
  return (
    <Fragment>
      <nav className="navbar row navbar-custom">
        <div className="col-12 col-md-3">
          <div className="navbar-brand" to={`/`}>            
            <Link  className="btn btn-block" to={`/`}>
              <img src="/images/LogoIgnakee.png" className="logo" alt="Logo"/>
            </Link>
          </div>
        </div>

        <h1>Advent´s Beliefs Bot Project</h1>
 
        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <button className="btn" id="login_btn">
            <i className="fa fa-user-circle"></i> Login
          </button>
          <span id="cart" className="ml-3">
            <i className="fa fa-shopping-cart"></i> Cart
          </span>
          <span className="ml-1" id="cart_count">
            2
          </span>
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;

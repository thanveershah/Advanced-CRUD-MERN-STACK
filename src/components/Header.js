import React, { Component } from "react";
import PropTypes from "prop-types";
// import { BrowswerRouter as Router ,  Link } from "react-router-dom";

export default class Header extends Component {
  static propTypes = {
    prop: PropTypes
  };

  render() {
    return (
      <div>
        <ul>
          <Router >
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/navbar">Navbar</Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
          </li>
          </Router>
        </ul>
      </div>
    );
  }
}

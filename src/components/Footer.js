import React from "react";
import { Link } from "gatsby";

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <p className="footer-copyright">
        &copy; 2016 <Link to={"/"}>Xiaoxiong 的日常</Link>
        <br />
        <small>Built with Gatsby</small>
      </p>
    </div>
  </footer>
);

export default Footer;

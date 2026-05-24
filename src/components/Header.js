import React from "react";
import { Link } from "gatsby";

const Header = props => (
  <header className="site-header">
    <div className="nav-primary">
      <div className="nav-logo">
        <Link to="/blog/">日常</Link>
      </div>

      <div className="nav-items">
        <ul>
          <li>
            <Link to="/blog/">首页</Link>
          </li>
          <li>
            <Link to="/blog/">归档</Link>
          </li>
          <li>
            <Link to="/blog/">友情链接</Link>
          </li>
          <li>
            <Link to="/blog/">联系我</Link>
          </li>
        </ul>
      </div>
    </div>
  </header>
);

export default Header;

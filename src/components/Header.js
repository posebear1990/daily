import React from "react";

const Header = props => (
  <header className="site-header">
    <div className="nav-primary">
      <div className="nav-logo">
        <a href="/">日常</a>
      </div>

      <div className="nav-items">
        <ul>
          <li>
            <a href="/">首页</a>
          </li>
          <li>
            <a href="/">归档</a>
          </li>
          <li>
            <a href="/">友情链接</a>
          </li>
          <li>
            <a href="/">联系我</a>
          </li>
        </ul>
      </div>
    </div>
  </header>
);

export default Header;

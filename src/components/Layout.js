import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Header from "./Header";
import Footer from "./Footer";

import "../../static/css/normalize.css";
import "../../static/css/base.css";
import "../../static/css/highlight.css";
import "../../static/fonts/iconfont.css";

export default ({ children }) => (
  <StaticQuery
    query={graphql`
      query LayoutQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => [
      <Header key={1} />,
      <div key={2} className="container clearfix">
        {children}
      </div>,
      <Footer key={3} />
    ]}
  />
);

import React from "react";
import { Link } from "gatsby";
import { Helmet } from "react-helmet";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Xiaoxiong Daily</title>
        <link rel="stylesheet" href="/xiaoxiaoxiaoxiong-home/asset/styles/index.css" />
        <script src="/xiaoxiaoxiaoxiong-home/lib/jquery.min.js" />
        <script src="/xiaoxiaoxiaoxiong-home/lib/jquery-canvas-sparkles.js" />
        <script src="/xiaoxiaoxiaoxiong-home/src/sparkle.js" />
      </Helmet>

      <div className="star-background" />
      <div className="content">
        <Link to="/blog/" className="logo-link" title="Enter Daily Blog">
          <img
            src="/xiaoxiaoxiaoxiong-home/asset/images/Nichijou_logo.svg"
            alt="Nichijou Logo"
            className="logo"
          />
        </Link>

        <div className="footer">Xiaoxiong Daily</div>
        <div className="player">
          <iframe
            className="netease-music"
            frameBorder="no"
            border="0"
            marginWidth="0"
            marginHeight="0"
            width="280"
            height="52"
            src="https://music.163.com/outchain/player?type=2&id=651241&auto=0&height=32"
            title="Netease Music"
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;

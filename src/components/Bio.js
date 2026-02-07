import React from "react";

const Bio = props => {
  const {
    siteBio,
    weibo_url,
    zhihu_url,
    douban_url,
    github_url,
    authorBio
  } = props.data;

  return (
    <div className="blog-description site-bio">
      <div className="author">
        <h3 className="side-title">作者 · · · · · · </h3>
        <div className="author-pic" />
        <div className="author-link">
          <a
            title="weibo"
            href={weibo_url}
            target="_blank"
            rel="noopener noreferrer">
            <i
              className="icon iconfont icon-microblog-copy"
              style={{ fontSize: "24px" }}
            />
          </a>
          <a
            title="zhihu"
            href={zhihu_url}
            target="_blank"
            rel="noopener noreferrer">
            <i
              className="icon iconfont icon-zhihufangxingdianji"
              style={{ fontSize: "25px" }}
            />
          </a>
          <a
            title="douban"
            href={douban_url}
            target="_blank"
            rel="noopener noreferrer">
            <i
              className="icon iconfont icon-douban-copy"
              style={{ fontSize: "25px" }}
            />
          </a>
          <a
            title="github"
            href={github_url}
            target="_blank"
            rel="noopener noreferrer">
            <i
              className="icon iconfont icon-github"
              style={{ fontSize: "21.5px" }}
            />
          </a>
        </div>
        <p
          className="author-content"
          dangerouslySetInnerHTML={{ __html: authorBio }}
        />
      </div>
    </div>
  );
};

export default Bio;

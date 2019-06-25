import React from "react";
import { Link, graphql } from "gatsby";
import get from "lodash/get";
import Layout from "../components/Layout";
import Bio from "../components/Bio";

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, "props.data.site.siteMetadata.title");
    const siteAuthor = get(this, "props.data.site.siteMetadata.author");
    const siteData = get(this, "props.data.site.siteMetadata");
    const posts = get(this, "props.data.allMarkdownRemark.edges");

    return (
      <Layout title={siteTitle}>
        <ol className="post-list">
          {posts.map(post => {
            if (post.node.path !== "/404/") {
              const title =
                get(post, "node.frontmatter.title") || post.node.path;

              return (
                <li key={post.node.fields.slug} className="post-stub post">
                  <h4 className="post-stub-title">
                    <Link className="js-ajax-link" to={post.node.fields.slug}>
                      {title}
                    </Link>
                  </h4>
                  <span className="post-copyright">
                    {post.node.fields.copyright || "原创"}
                  </span>
                  <span className="post-author-name">
                    {post.node.fields.author || siteAuthor || "Xiaoxiong"}
                  </span>
                  <time
                    className="post-stub-date"
                    dateTime={post.node.frontmatter.date}>
                    {post.node.frontmatter.date}
                  </time>
                  <p className="post-previous">
                    {post.node.excerpt}
                    <Link className="post-read-more" to={post.node.fields.slug}>
                      阅读全文
                    </Link>
                  </p>
                </li>
              );
            }
            return null;
          })}
        </ol>
        <Bio data={siteData} />
      </Layout>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
        author
        blogUrl
        authorPic
        linkPrefix
        weibo_url
        zhihu_url
        douban_url
        github_url
        siteBio
        authorBio
      }
    }
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/post/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt(format: PLAIN, pruneLength: 75, truncate: true)
          frontmatter {
            date(formatString: "YYYY-MM-DD hh:mm")
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

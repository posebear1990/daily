import React from "react";
import Helmet from "react-helmet";
import get from "lodash/get";
import { graphql } from "gatsby";
import Layout from "../components/Layout";

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const siteTitle = get(this.props, "data.site.siteMetadata.title");
    const author = get(this.props, "data.site.siteMetadata.author");

    return (
      <Layout>
        <Helmet title={`${post.frontmatter.title} - ${siteTitle}`} />

        <article className="post-container post">
          <header className="post-header">
            <h1 className="post-title">{post.frontmatter.title}</h1>
            <p className="post-date">
              <span className="post-copyright">
                {post.frontmatter.copyright || "原创"}
              </span>
              <time dateTime={post.frontmatter.date}>
                {post.frontmatter.date}
              </time>
              <span className="post-author-name">
                {post.frontmatter.author || author}
              </span>
            </p>
          </header>

          <div
            className="post-content clearfix"
            ref="markdown"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </article>
      </Layout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD hh:mm")
      }
    }
  }
`;

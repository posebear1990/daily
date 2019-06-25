const _ = require("lodash");
const path = require("path");
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const pages = [];
  const blogPost = path.resolve("./src/templates/blog-post.js");

  return graphql(
    `
      {
        allMarkdownRemark(limit: 1000) {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      console.error(result.errors);
      reject(result.errors);
    }

    // Create blog posts pages.
    _.each(result.data.allMarkdownRemark.edges, edge => {
      createPage({
        path: edge.node.fields.slug,
        component: blogPost,
        context: {
          slug: edge.node.fields.slug
        }
      });
    });
  });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === `MarkdownRemark`) {
    const { createNodeField } = actions;
    const slug = createFilePath({ node, getNode, basePath: `pages` });

    createNodeField({
      node,
      name: `slug`,
      value: slug
    });
  }
};

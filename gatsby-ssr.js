const React = require("react");

exports.onRenderBody = ({ setPostBodyComponents }) => {
  const token = process.env.CLOUDFLARE_WEB_ANALYTICS_TOKEN?.trim();
  if (!token) {
    return;
  }

  setPostBodyComponents([
    React.createElement("script", {
      key: "cf-web-analytics",
      defer: true,
      src: "https://static.cloudflareinsights.com/beacon.min.js",
      "data-cf-beacon": JSON.stringify({ token })
    })
  ]);
};

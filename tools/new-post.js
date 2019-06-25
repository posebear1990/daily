var fs = require("fs");

const now = new Date();
const dateString = `${now.getFullYear()}-${now.getMonth() +
  1}-${now.getDate()}`;

const type = process.argv.includes("--daily") ? "daily" : "post";
const isDaily = type === "daily";

const title = isDaily
  ? dateString
  : process.argv[process.argv.indexOf("--post") + 1];

if (!title) {
  throw "必须添加标题";
}

const dirPath = isDaily
  ? `src/pages/daily/${dateString}/`
  : `src/pages/post/${dateString}-${title}/`;
const filePath = `${dirPath}${title}.md`;
const content = `---
title: ${isDaily ? title : ""}
date: "${new Date().toISOString()}"
path: "/${title}/"
tags:
- 
- 
- 
---`;

fs.mkdirSync(dirPath, 0755);
fs.writeFileSync(filePath, content);

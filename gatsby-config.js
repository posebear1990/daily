module.exports = {
  siteMetadata: {
    title: "Xiaoxiong 日常",
    author: "Xiaoxiong",
    blogUrl: "http://nichijou.xiaoxiaoxiaoxiong.com",
    authorPic: "avatar.jpg",
    linkPrefix: "/istory36",
    weibo_url: "http://weibo.com/posebear1990",
    zhihu_url: "https://zhihu.com/people/posebear1990",
    douban_url: "https://www.douban.com/people/posebear1990",
    github_url: "https://github.com/posebear1990",
    siteBio:
      "Xiaoxiong 同学文艺情怀的自留地，内容可能涉及原创故事，读书笔记，个人成长，自我提高，学习方法等，欢迎大家扫上面的二维码进行关注。",
    authorBio:
      "Hi, 我是Xiaoxiong。</br> 是一名前端程序员，Web开发者。平时休息的时候，我会写写博客，弹弹吉他，偶尔周末也会踢踢球。如果你对我感兴趣，欢迎关注我的微博，知乎，豆瓣，GitHub等社交网络。"
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages"
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-plugin-typography`,
            options: {
              pathToConfigModule: `src/utils/typography.js`
            }
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590
            }
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`
            }
          },
          "gatsby-remark-prismjs",
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-smartypants"
        ]
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      }
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`
  ]
};

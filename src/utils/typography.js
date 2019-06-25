import Typography from "typography";
import githubTheme from "typography-theme-github";

const typography = new Typography(
  Object.assign(githubTheme, {
    overrideThemeStyles: ({ rhythm }, options, styles) => ({
      body: {
        background: "#031d1e"
      },
      a: {
        color: "#00a0ad"
      }
    })
  })
);

const { rhythm, scale } = typography;
export { rhythm, scale, typography as default };

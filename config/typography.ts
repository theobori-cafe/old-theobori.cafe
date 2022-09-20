import Typography from "typography";

const typography = new Typography({
  baseFontSize: "20px",
  baseLineHeight: 1.45,
  headerFontFamily: ["Helvetica Neue", "Segoe UI", "Helvetica", "Arial", "sans-serif"],
  bodyFontFamily: ["Georgia", "serif"],
  // See below for the full list of options.
});

// Output CSS as string.
typography.toString();

// Or insert styles directly into the <head> (works well for client-only
// JS web apps.
typography.injectStyles();

export default typography;

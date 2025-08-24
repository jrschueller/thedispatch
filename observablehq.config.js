// See https://observablehq.com/framework/config for documentation.
export default {
  // The app’s title; used in the sidebar and webpage titles.
  title: "The Dispatch",
  // Content to add to the head of the page, e.g. for a favicon:
  head: '<link rel="icon" href="observable.png" type="image/png" sizes="32x32">',
  root: "src",
  dynamicPaths: [
    "/chart.js"
  ],
  // omit static pages to keep it lean
  pages: []
};

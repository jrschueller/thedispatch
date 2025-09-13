// https://observablehq.com/framework/config for documentation.
export default {
  title: null,
  head: null,
  header: null,
  footer: null,
  pages: [],
  theme: ["cotton"],  // or your chosen theme
  style: "custom.css",  // single style file to override defaults
  root: "src",
  dynamicPaths: [
    "/vax_coverage.js",
    "/map.js",
    "/leaflet_map.js",
    "/chart.js"
  ]
};

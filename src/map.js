import * as Plot from "npm:@observablehq/plot";
import { FileAttachment } from "observablehq:stdlib";
import * as topojson from "npm:topojson-client";

export async function renderChart() {

  const us = await FileAttachment("./data/us-counties-10m.json").json();
  const nation = topojson.feature(us, us.objects.nation);
  const states = topojson.feature(us, us.objects.states);
  const statemesh = topojson.mesh(us, us.objects.states, (a, b) => a !== b);
  const counties = topojson.feature(us, us.objects.counties);

  return Plot.plot({
    projection: "albers",
    marks: [
      Plot.geo(statemesh, { clip: "frame", strokeOpacity: 0.1 }),
      Plot.geo(nation, { clip: "frame" }),
      Plot.text(
        states.features,
        Plot.centroid({
          text: (d) => d.properties.name,
          textAnchor: "middle",
          stroke: "white",
          fill: "black"
        })
      )
    ]
  });

  // return Plot.plot({
  //   width: 680,
  //   height: 420,
  //   x: {
  //     axis: "bottom",
  //     label: "School year",
  //     labelAnchor: "right",
  //     //labelOffset: 30,
  //     grid: false,
  //     tickSize: 0
  //   },
  //   y: {
  //     domain: [88.0, 100.0],
  //     axis: "left",
  //     label: "Estimated coverage (%)",
  //     grid: true,
  //     tickSize: 0
  //   },
  //   marks: [
  //     Plot.line(data, {
  //       x: "school_year",
  //       y: "estimate_pct",
  //       stroke: "#d1221f",
  //       strokeWidth: 2.5,
  //       curve: "natural",
  //       marker: "circle",
  //       tip: {
  //         channels: {
  //           "School Year: ": d => d.school_year,
  //           "Estimated coverage (%): ": d => d.estimate_pct.toFixed(1) + "%"
  //         },
  //         format: { x: null, y: null }
  //       }
  //     }),
  //     Plot.frame({ anchor: "bottom", stroke: "black", strokeWidth: 1.25 }),
  //   ]
  // });
  
}
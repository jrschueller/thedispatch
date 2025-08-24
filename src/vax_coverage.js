import * as Plot from "npm:@observablehq/plot";
import { FileAttachment } from "observablehq:stdlib";

export async function renderChart() {

  const data = await FileAttachment("./data/vax_coverage.csv").csv({ typed: true });

  return Plot.plot({
    width: 680,
    height: 420,
    x: {
      axis: "bottom",
      label: "School year",
      labelAnchor: "right",
      //labelOffset: 30,
      grid: false,
      tickSize: 0
    },
    y: {
      domain: [88.0, 100.0],
      axis: "left",
      label: "Estimated coverage (%)",
      grid: true,
      tickSize: 0
    },
    marks: [
      Plot.line(data, {
        x: "school_year",
        y: "estimate_pct",
        stroke: "#d1221f",
        strokeWidth: 2.5,
        curve: "natural",
        marker: "circle",
        tip: {
          channels: {
            "School Year: ": d => d.school_year,
            "Estimated coverage (%): ": d => d.estimate_pct.toFixed(1) + "%"
          },
          format: { x: null, y: null }
        }
      }),
      Plot.frame({ anchor: "bottom", stroke: "black", strokeWidth: 1.25 }),
    ]
  });
  
}
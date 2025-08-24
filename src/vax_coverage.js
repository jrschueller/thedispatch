import * as Plot from "npm:@observablehq/plot";
import { FileAttachment } from "observablehq:stdlib";

export async function renderChart() {
  const data = await FileAttachment("./data/vax_coverage.csv").csv({ typed: true });
  return Plot.plot({
    width: 680,
    height: 450,
    marks: [
        Plot.lineY(data, {x: "school_year", y: "estimate_pct"}),
        Plot.text(data, {x: "school_year", y: "estimate_pct", text: "vaccine_exemption", lineAnchor: "bottom", dy: -10, lineWidth: 10, fontSize: 12})
    ]
  });
}
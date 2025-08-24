import * as Plot from "npm:@observablehq/plot";
import { FileAttachment } from "observablehq:stdlib";

export async function renderChart() {
  const data = await FileAttachment("./data/events.json").json();
  return Plot.plot({
    width,
    height,
    marginTop: 30,
    x: {nice: true, label: null, tickFormat: ""},
    y: {axis: null},
    marks: [
        Plot.ruleX(events, {x: "year", y: "y", markerEnd: "dot", strokeWidth: 2.5}),
        Plot.ruleY([0]),
        Plot.text(events, {x: "year", y: "y", text: "name", lineAnchor: "bottom", dy: -10, lineWidth: 10, fontSize: 12})
    ]
    /* optionally disable titles, legends, etc. */
  });
}
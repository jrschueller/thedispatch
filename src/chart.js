import * as Plot from "npm:@observablehq/plot";
import { FileAttachment } from "observablehq:stdlib";

export async function renderChart() {
  const data = await FileAttachment("./data/events.json").json();
  return Plot.plot({
    x: {nice: true, label: null, tickFormat: ""},
    y: {axis: null},
    marks: [
        Plot.ruleX(data, {x: "year", y: "y", markerEnd: "dot", strokeWidth: 2.5}),
        Plot.ruleY([0]),
        Plot.text(data, {x: "year", y: "y", text: "name", lineAnchor: "bottom", dy: -10, lineWidth: 10, fontSize: 12})
    ]
  });
}
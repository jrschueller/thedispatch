import { FileAttachment } from "observablehq:stdlib";
import * as L from "npm:leaflet";
import * as protomapsL from "npm:protomaps-leaflet@3.1.1";

export async function renderMap(display) {

  const areas = await FileAttachment("data/cb_2018_us_zcta510_500k_nolimit.pmtiles");

  const center = [38,-100];
  const zoom = 4;

  const div = display(document.createElement("div"));
  div.style = "height: 400px; width: 800px;";
  const map = L.map(div).setView(center,zoom);
  var baseLayer = protomapsL.leafletLayer({url:'https://api.protomaps.com/tiles/v3/{z}/{x}/{y}.mvt?key=3b33283653b3de3e',theme:'white'})
  baseLayer.addTo(map);

  var layer = protomapsL.leafletLayer({url:areas.href, maxDataZoom:7, paintRules: [
    {
        dataLayer: "zcta",
        symbolizer: new protomapsL.PolygonSymbolizer({
            fill:"steelblue",
            opacity: 1,
            width: 0.2,
            stroke: "cyan"
        })
    }
  ]})
  layer.addTo(map);

  return div;

}
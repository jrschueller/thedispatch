---
title: Home
---

# Event Values

This page demonstrates querying DuckDB through a helper module and visualizing the results with Mosaic and vgplot.

```js
import {MosaicClient as Mosaic} from "@uwdata/vgplot";
import * as vg from "@uwdata/vgplot";
import {query} from "./db.js";

const data = await query(`SELECT year, y FROM events_csv ORDER BY year`);

const chart = vg.plot({
  x: {label: "Year"},
  y: {label: "Value"},
  marks: [vg.barY(data, {x: "year", y: "y"})]
});

const mosaic = new Mosaic();
mosaic.add(vg.hconcat(chart));
mosaic
```

Data source: `src/data/events.csv`. The bar chart shows sample event values by year inside a Mosaic layout tile.

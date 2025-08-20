# Thedispatch

This is an [Observable Framework](https://observablehq.com/framework/) app.

## Installation and development

1. **Install Node.js 18 or newer.** The project specifies the runtime in
   `package.json` and requires a modern Node environment.
2. **Install dependencies.** Run the following command in the project root to
   download all packages defined in `package.json`:

   ```bash
   npm install
   ```

3. **Start the development server.** Observable's preview server provides hot
   reloading for pages under `src/`. Launch it with:

   ```bash
   npm run dev
   ```

   The site will be available at <http://localhost:3000>.

For additional tips, see the [Observable Framework getting started
guide](https://observablehq.com/framework/getting-started).

## Data and visualization stack

This project combines three key libraries:

* **[DuckDB-WASM](https://github.com/duckdb/duckdb-wasm)** runs the
  [DuckDB](https://duckdb.org/) analytical database in the browser. The helper
  module in [`src/db.js`](./src/db.js) loads sample CSV data into an in-memory
  database and exposes a `query` function for executing SQL.
* **[Mosaic](https://uwdata.github.io/mosaic/)** provides a tiled layout and
  reactive dataflow for building dashboards. `MosaicClient` is imported from
  `@uwdata/vgplot` and lets Observable pages arrange interactive views.
* **[vgplot](https://github.com/uwdata/vgplot)** renders charts. After DuckDB
  returns query results, they are passed to `vgplot` mark functions (such as
  `vg.barY`) to generate visualizations.

Together, DuckDB-WASM supplies fast in-browser SQL, vgplot turns query results
into graphics, and Mosaic coordinates the layout and interactions among plots.

## Project structure

A typical Framework project looks like this:

```ini
.
├─ src
│  ├─ components
│  │  └─ timeline.js           # an importable module
│  ├─ data
│  │  ├─ launches.csv.js       # a data loader
│  │  └─ events.json           # a static data file
│  ├─ example-dashboard.md     # a page
│  └─ example-report.md        # another page
├─ .gitignore
├─ observablehq.config.js      # the app config file
├─ package.json
└─ README.md
```

**`src`** - This is the “source root” — where your source files live. Pages go here. Each page is a Markdown file. Observable Framework uses [file-based routing](https://observablehq.com/framework/project-structure#routing), which means that the name of the file controls where the page is served. You can create as many pages as you like. Use folders to organize your pages.


**`src/data`** - You can put [data loaders](https://observablehq.com/framework/data-loaders) or static data files anywhere in your source root, but we recommend putting them here.

**`src/components`** - You can put shared [JavaScript modules](https://observablehq.com/framework/imports) anywhere in your source root, but we recommend putting them here. This helps you pull code out of Markdown files and into JavaScript modules, making it easier to reuse code across pages, write tests and run linters, and even share code with vanilla web applications.

**`observablehq.config.js`** - This is the [app configuration](https://observablehq.com/framework/config) file, such as the pages and sections in the sidebar navigation, and the app’s title.

## Command reference

| Command           | Description                                              |
| ----------------- | -------------------------------------------------------- |
| `npm install`            | Install or reinstall dependencies                        |
| `npm run dev`        | Start local preview server                               |
| `npm run build`      | Build your static site, generating `./dist`              |
| `npm run deploy`     | Deploy your app to Observable                            |
| `npm run clean`      | Clear the local data loader cache                        |
| `npm run observable` | Run commands like `observable help`                      |

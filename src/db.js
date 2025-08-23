import * as duckdb from '@duckdb/duckdb-wasm';

/**
 * Shared DuckDB-WASM instance with helper utilities.
 *
 * A sample CSV file from `src/data` is loaded into the virtual filesystem.
 * A Parquet version is generated in-memory to showcase reading both formats.
 * Tables `events_csv` and `events_parquet` are created.
 *
 * To add new datasets:
 * 1. Drop files (CSV, Parquet, etc.) into `src/data`.
 * 2. Register each file with `db.registerFileURL` using a URL created with
 *    `new URL('./data/<file>', import.meta.url).href`.
 * 3. Create tables with SQL using `read_csv_auto`, `read_parquet`, or other
 *    readers. Then query them via the `query` helper below.
 */

// Select the best available WASM bundle.
const bundles = duckdb.getJsDelivrBundles();
const bundle = duckdb.selectBundle(bundles);

const worker = new Worker(new URL(bundle.mainWorker, import.meta.url), {
  type: 'module'
});
const logger = new duckdb.ConsoleLogger();
const db = new duckdb.AsyncDuckDB(logger, worker);
await db.instantiate(
  new URL(bundle.mainModule, import.meta.url).href,
  bundle.pthreadWorker && new URL(bundle.pthreadWorker, import.meta.url).href
);

// Load sample data into the virtual filesystem.
await db.registerFileURL('events.csv', new URL('./data/events.csv', import.meta.url).href);

// Create tables from the sample data. A Parquet file is generated from the CSV
// to demonstrate Parquet ingestion without bundling the binary.
{
  const conn = await db.connect();
  await conn.query(`
    CREATE TABLE events_csv AS SELECT * FROM read_csv_auto('events.csv');
    COPY (SELECT * FROM events_csv) TO 'events.parquet' (FORMAT 'parquet');
    CREATE TABLE events_parquet AS SELECT * FROM read_parquet('events.parquet');
  `);
  await conn.close();
}

/**
 * Execute a SQL query against the shared database.
 * @param {string} sql SQL statement to execute.
 * @param {any[]} [params] Optional query parameters.
 * @returns {Promise<any[]>} Query result rows.
 */
export async function query(sql, params) {
  const conn = await db.connect();
  try {
    const result = await conn.query(sql, params);
    return result.toArray();
  } finally {
    await conn.close();
  }
}

export default db;

import { Pool } from "pg";

let conn: any;

if (!conn) {
  conn = new Pool({
    host: process.env.PGSQL_HOST,
    port: Number(process.env.PGSQL_PORT),
    database: process.env.PGSQL_DATABASE,
  });
}

export default conn;

// To do
// Make scheduling apis
// Reformat Schedule blocks data to return each day, with times nested
// Start UI
// When Selecting day, search schedule blocks for correct date and avail time slots
// Render timeslots then

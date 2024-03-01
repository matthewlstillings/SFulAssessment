import { NextApiRequest, NextApiResponse } from "next";
import conn from "../lib/db";

export async function GET() {
  try {
    const query = `WITH days_cte AS (
        SELECT generate_series(current_date, current_date + interval '2 months', interval '1 day') AS date
    )
    SELECT
        sb.block_id,
        sb.user_id,
        d.date,
        sb.start_time,
        sb.end_time,
        sb.day_of_week
    FROM schedule_blocks sb
        INNER JOIN days_cte d ON sb.day_of_week ILIKE '%' || to_char(d.date, 'FMDay') || '%'
    WHERE NOT EXISTS (
        SELECT 1
        FROM appointments a
        WHERE a.block_id = sb.block_id
        AND a.date = d.date
    )
    ORDER BY sb.start_time;
          `;

    const result = await conn.query(query);
    const formatResults = result.rows.reduce((acc: any, curr: any) => {
      const date = new Date(curr.date);
      const dateString = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`;
      if (!acc[dateString]) {
        acc[dateString] = [curr];
      } else {
        acc[dateString].push(curr);
      }
      return acc;
    }, {});
    return Response.json({ data: formatResults });
  } catch (error) {
    console.log(error);
  }
}

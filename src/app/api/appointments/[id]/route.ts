import conn from "../../lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    // hard coded user id for time
    const query = `SELECT 
    a.*, 
    s.name AS student_name, 
    c.name AS coach_name,
    s.phone as student_phone,
    c.phone as coach_phone,
    z.day_of_week,
    z.start_time,
    z.end_time
    FROM 
        appointments a
        INNER JOIN users s ON a.student_id = s.user_id
        INNER JOIN users c ON a.coach_id = c.user_id
        INNER JOIN schedule_blocks z ON a.block_id = z.block_id
    WHERE 
        a.student_id = 3
    ORDER BY 
        a.date;`;
    const result = await conn.query(query);

    return Response.json({ data: result.rows });
  } catch (error: any) {
    throw new Error(error);
  }
}

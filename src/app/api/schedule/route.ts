import { NextApiRequest, NextApiResponse } from "next";
import conn from "../lib/db";
import { NextResponse } from "next/server";

type Days =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type ScheduleBlock = {
  userId: number;
  blockId?: number;
  date: Date;
  startTime: Date;
  endTime: Date;
  dayOfWeek: Days;
};

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    let query = `SELECT * FROM schedule_blocks WHERE user_id = 1 ORDER BY start_time;`;
    let result = await conn.query(query);
    const formatResults = result.rows.reduce((acc: any, curr: any) => {
      if (!acc[curr.day_of_week]) {
        acc[curr.day_of_week] = [curr];
      } else {
        acc[curr.day_of_week].push(curr);
      }
      return acc;
    }, {});
    query = `SELECT 
    a.*,
    s.name AS student_name, 
    c.name AS coach_name,
    s.phone as student_phone,
    c.phone as coach_phone,
    z.day_of_week,
    z.start_time,
    z.end_time
    FROM appointments a
    INNER JOIN users s ON a.student_id = s.user_id
    INNER JOIN users c ON a.coach_id = c.user_id
    INNER JOIN schedule_blocks z ON a.block_id = z.block_id
    WHERE a.coach_id = 1
    ORDER BY a.date;`;
    result = await conn.query(query);
    return Response.json({
      data: { availability: formatResults, upcomingAppointments: result.rows },
    });
  } catch (error: any) {
    throw new Error(error);
  }
}

// const addScheduleBlock = async (
//   userId: string,
//   scheduleBlock: ScheduleBlock
// ) => {
//   try {
//     const query = `
//       INSERT INTO schedule_blocks
//       VALUES (${userId}, ${scheduleBlock.dayOfWeek}, ${scheduleBlock.startTime}, ${scheduleBlock.endTime});
//     `;
//     const result = await conn.query(query);
//   } catch (error) {
//     console.error(error);
//   }
// };

// export const removeScheduleBlock = async (scheduleId: number) => {
//   try {
//     const query = `
//       INSERT INTO schedule_blocks
//       VALUES (${userId}, ${scheduleBlock.dayOfWeek}, ${scheduleBlock.startTime}, ${scheduleBlock.endTime});
//     `;
//     const result = await conn.query(query);
//   } catch (error) {
//     console.error(error);
//   }
// };

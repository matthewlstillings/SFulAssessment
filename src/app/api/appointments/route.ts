import conn from "../lib/db";
import { NextRequest, NextResponse } from "next/server";
import { GET as GetAvailability } from "../availability/route";
import { GET as GetAppointment } from "./[id]/route";

export async function GET() {
  try {
    const query = `SELECT * FROM appointments WHERE coach_id = 1 ORDER BY date;`;
    const result = await conn.query(query);

    return Response.json(result);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const { student_id, coach_id, date, block_id } = body;
  try {
    const query = `INSERT INTO appointments ("student_id", "coach_id", "date", "block_id") 
    VALUES ($1, $2, $3, $4)
    RETURNING *`;
    await conn.query(query, [student_id, coach_id, date, block_id]);
    let response = await GetAppointment();
    return Response.json(await response?.json());
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const { appointmentId } = body;
  try {
    const query = `DELETE FROM appointments WHERE appointment_id = ${appointmentId};`;
    await conn.query(query);
    const response = await GetAvailability();
    return Response.json(await response?.json());
  } catch (error: any) {
    throw new Error(error);
  }
}

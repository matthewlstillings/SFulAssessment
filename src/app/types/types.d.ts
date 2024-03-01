type Days =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type ScheduleBlock = {
  user_id: number;
  block_id?: number;
  date: Date;
  start_time: string;
  end_time: string;
  day_of_week: Days;
};

export type Appointment = ScheduleBlock & {
  coach_name: string;
  student_name: string;
  coach_phone: string;
  student_phone: string;
  appointment_id: string;
};

type User = "student" | "coach" | undefined;

"use client";
import CoachDashboard from "./CoachDashboard";
import { useSearchParams } from "next/navigation";
import StudentDashboard from "./StudentDashboard";

export default function Dashboard() {
  const searchParams = useSearchParams();

  const search = searchParams.get("user");
  return search === "coach" ? <CoachDashboard /> : <StudentDashboard />;
}

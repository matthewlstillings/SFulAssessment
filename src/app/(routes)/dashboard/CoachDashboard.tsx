"use client";
import styles from "./styles.module.css";
import { ScheduleBlock } from "../../types/types";
import { useEffect, useState } from "react";
import AppointmentCard from "@/app/_components/AppointmentCard";

export default function CoachDashboard() {
  const [availablity, setAvailablity] = useState<any>();
  const [appointments, setAppointments] = useState<any>([]);

  useEffect(() => {
    (async () => {
      try {
        const res: any = await fetch("/api/schedule");
        const { data } = await res.json();
        const { availability, upcomingAppointments } = data;
        setAvailablity(availability);
        setAppointments(upcomingAppointments);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const dayAvailability = (times: ScheduleBlock[], name: string) => {
    return (
      <div className={styles.schedule_blocks}>
        <h3>{name}</h3>
        {times.map((time: ScheduleBlock, indx) => (
          <div key={indx}>
            <p>{`${time.start_time} - ${time.end_time}`}</p>
          </div>
        ))}
      </div>
    );
  };

  const handleRemoveAppointment = async (appointment_id: string) => {
    const data = {
      appointmentId: appointment_id,
    };
    await fetch("/api/appointments", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    setAppointments((prev: any) =>
      prev.filter((apt: any) => apt.appointment_id !== appointment_id)
    );
  };

  return (
    <div className={styles.dashboard}>
      <h2>Coach Dashboard</h2>
      {appointments.length > 0 && (
        <div className="inner">
          <p>Upcoming Appointments</p>
          <div className={styles.flexLeft}>
            {appointments.map((app: any, idx: number) => {
              return (
                <AppointmentCard
                  removeAppointment={handleRemoveAppointment}
                  appointment={app}
                  key={idx}
                  userType="student"
                />
              );
            })}
          </div>
        </div>
      )}
      {availablity && (
        <div className="inner">
          <p>Current Availablity</p>
          <div className={styles.flex}>
            {/* Ran short on time but would not hard code these in, would sort and iterate*/}
            {dayAvailability(availablity.Monday, "Monday")}
            {dayAvailability(availablity.Tuesday, "Tuesday")}
            {dayAvailability(availablity.Wednesday, "Wednesday")}
            {dayAvailability(availablity.Thursday, "Thursday")}
            {dayAvailability(availablity.Friday, "Friday")}
          </div>
        </div>
      )}
    </div>
  );
}

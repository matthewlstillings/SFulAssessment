"use client";
import { Appointment, User } from "../types/types";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Link,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useCallback } from "react";

const AppointmentCard = ({
  appointment,
  userType,
  removeAppointment,
}: {
  appointment: Appointment;
  userType: User;
  removeAppointment: (id: string) => void;
}) => {
  const {
    coach_name,
    start_time,
    end_time,
    date,
    day_of_week,
    coach_phone,
    student_phone,
    appointment_id,
  } = appointment;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">
          {day_of_week} {dayjs(date).format("MMMM DD, YYYY")}
        </Typography>
        <Typography variant="h5">Upcoming Coaching Session</Typography>
        <Typography variant="subtitle1">
          from {dayjs(start_time, "HH:mm:ss").format("h:mm a")} to{" "}
          {dayjs(end_time, "HH:mm:ss").format("h:mm a")}{" "}
        </Typography>
        <Typography sx={{ marginBottom: ".5rem" }}>
          with {coach_name}
        </Typography>
        <Typography>
          Contact: {userType === "student" ? coach_phone : student_phone}
        </Typography>
        <Button
          variant="outlined"
          sx={{
            borderColor: "red !important",
            color: "red",
            marginTop: "1rem",
          }}
          onClick={() => removeAppointment(appointment_id)}
        >
          Cancel
        </Button>
      </CardContent>
    </Card>
  );
};

export default AppointmentCard;

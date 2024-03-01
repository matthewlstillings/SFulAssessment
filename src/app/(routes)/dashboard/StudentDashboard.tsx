"use client";
import AppointmentCard from "@/app/_components/AppointmentCard";
import { Appointment } from "@/app/types/types";
import { Button, Grid, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";

export default function StudentDashboard() {
  const [slots, setSlots] = useState<any>();
  const [selectedDay, setSelectedDay] = useState<string>();
  const [appointment, setAppointment] = useState<Appointment>();

  useEffect(() => {
    (async () => {
      try {
        // NOTE: Would create service files/use hook/or third party library
        // Didn't spoof multiple students for time's sake
        // Loader needs to be added
        let res: any = await fetch(`/api/appointments/3`);
        res = await res.json();
        if (res.data[0]) {
          setAppointment(res.data[0]);
        } else {
          res = await fetch("/api/availability");
          const { data } = await res.json();
          setSlots(data);
          setSelectedDay(dayjs(new Date()).format("YYYY-M-D"));
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleScheduleAppointment = useCallback(
    async (coach_id: string, block_id: string) => {
      const res: any = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          coach_id,
          block_id,
          student_id: 3,
          date: selectedDay,
        }),
      });
      const { data } = await res.json();
      setAppointment(data[0]);
    },
    [selectedDay]
  );

  const handleRemoveAppointment = async (appointment_id: string) => {
    const data = {
      appointmentId: appointment_id,
    };
    const res: any = await fetch("/api/appointments", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resData = await res.json();
    setSlots(resData.data);
    setAppointment(undefined);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <h2>Student Dashboard</h2>

      {appointment ? (
        <AppointmentCard
          appointment={appointment}
          userType="student"
          removeAppointment={handleRemoveAppointment}
        />
      ) : (
        <>
          <Typography variant="h5" sx={{ marginTop: "1rem" }}>
            Schedule Appointment
          </Typography>
          <Grid
            container
            spacing={0}
            justifyContent="center"
            sx={{ marginTop: "1rem" }}
          >
            <Grid
              item
              xs={5}
              sx={{
                background: "white",
                borderRadius: "6px",
                marginRight: "1rem",
              }}
            >
              <DateCalendar
                sx={{ color: "black" }}
                onChange={(e) => setSelectedDay(dayjs(e).format("YYYY-M-D"))}
              />
            </Grid>
            <Grid
              item
              xs={4}
              sx={{
                paddingTop: "2rem",
                background: "white",
                borderRadius: "6px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {slots && selectedDay && (
                <>
                  {!slots[selectedDay] ? (
                    <>
                      <Typography sx={{ color: "black" }}>
                        No availability
                      </Typography>
                    </>
                  ) : (
                    <>
                      {slots[selectedDay].map((slot: any, indx: number) => (
                        <Button
                          variant="contained"
                          sx={{ marginBottom: "1rem" }}
                          key={indx}
                          onClick={() =>
                            handleScheduleAppointment(
                              slot.user_id,
                              slot.block_id
                            )
                          }
                        >
                          <p>{`${dayjs(slot.start_time, "HH:mm:ss").format(
                            "h:mm a"
                          )} - ${dayjs(slot.end_time, "HH:mm:ss").format(
                            "h:mm a"
                          )}`}</p>
                        </Button>
                      ))}
                    </>
                  )}
                </>
              )}
            </Grid>
          </Grid>
        </>
      )}
    </LocalizationProvider>
  );
}

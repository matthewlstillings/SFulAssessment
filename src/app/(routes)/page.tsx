"use client";
import { createContext, useState } from "react";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { User } from "../types/types";

export default function Home() {
  const router = useRouter();

  const handleLogin = (userType: User) => {
    router.push(`/dashboard?user=${userType}`, { scroll: false });
  };

  return (
    <>
      <p>Login as:</p>
      <div>
        <div>
          <Button variant="contained" onClick={() => handleLogin("coach")}>
            Coach
          </Button>
          <Button variant="contained" onClick={() => handleLogin("student")}>
            Student
          </Button>
        </div>
      </div>
    </>
  );
}

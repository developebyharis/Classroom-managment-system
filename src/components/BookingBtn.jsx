import React, { useState } from "react";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function BookingBtn({ setOpenForm, clsId }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  async function handleClick() {
      console.log("Fetched classroom ID:", clsId);
      setOpenForm(clsId);
   
  }

  return (
    <>
      {pathname === "/teacher" && session?.user?.role === "Teacher" && (
        <Button size="sm" onClick={handleClick}>
          + Book
        </Button>
      )}
    </>
  );
}

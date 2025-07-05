
"use server"

import { getData } from "@/helper/getData";
import TeacherDashboardClient from "./TeacherDashboardClient";

export default async function page() {
  const { classroom, department, teacher, booking } = await getData();


  return (
    <TeacherDashboardClient
      classroom={classroom}
      department={department}
      teacher={teacher}
      booking={booking.data.booking}

    />
  );
}




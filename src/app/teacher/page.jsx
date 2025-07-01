import { getData } from "@/helper/getData";
import TeacherDashboardClient from "./TeacherDashboardClient";
import { db } from "@/lib/connectDb";

export default async function TeacherDashboardPage() {
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

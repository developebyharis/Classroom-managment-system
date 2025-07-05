"use server"
import { getData } from "@/helper/getData";
import AdminDashboardClient from "./AdminDashboardClient";
import { getTeacherDepartment } from "@/lib/server/filterMatch";

export default async function page() {
  const { classroom, department, teacher, booking } = await getData();
  const matchDepartment = await getTeacherDepartment(teacher);
  return (
    <AdminDashboardClient
      classroom={classroom}
      department={department}
      teacher={teacher}
      matchedDepartment={matchDepartment}
      booking={booking.data.booking}
      bookingTeachers={booking.data.teacher}
    />
  );
}

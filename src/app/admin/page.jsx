// "use server"
import { getData } from "@/helper/getData";
import AdminDashboardClient from "./AdminDashboardClient";
import { getTeacherDepartment } from "@/helper/filterMatch";

export default async function AdminPage() {
  const { classroom, department, teacher, booking } = await getData();
  const matchDepartment = getTeacherDepartment(teacher);
console.log("Matched Department:", matchDepartment);
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

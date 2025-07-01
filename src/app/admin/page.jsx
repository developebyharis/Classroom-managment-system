import { getData } from "@/helper/getData";
import AdminDashboardClient from "./AdminDashboardClient";

export default async function AdminPage() {
  const { classroom, department, teacher, booking } = await getData();

  return (
    <AdminDashboardClient
      classroom={classroom}
      department={department}
      teacher={teacher}
      booking={booking.data.booking}
      bookingTeachers={booking.data.teacher}
    />
  );
}

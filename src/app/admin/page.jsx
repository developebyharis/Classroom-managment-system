import { getData } from "@/helper/getCredentials";
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

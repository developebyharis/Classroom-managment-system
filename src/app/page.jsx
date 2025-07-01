import ClassroomFilter from "@/components/ClassroomFilter";
import { EmptyState } from "@/components/layout/PageLayout";
import { Search } from "lucide-react";
import { getData } from "@/helper/getData";

export default async function Home() {
  const { classroom, department, teacher, booking } = await getData();

  return (
    <div className="py-10 px-4">
      <h1 className="text-center text-3xl font-bold mb-8">
        Classroom Management System
      </h1>
        {classroom.length === 0 ? (
          <EmptyState
            icon={Search}
            title="No Classrooms Found"
            description="There are no classrooms available in the system at the moment."
          />
        ) : (
          <ClassroomFilter
            initialClassrooms={classroom}
            initialDepartments={department}
            initialTeachers={teacher}
            initialBookings={booking.data.booking}
          />
        )}
    </div>
  );
}

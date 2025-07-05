"use server"

import { EmptyState } from "@/components/layout/PageLayout";
import { Search } from "lucide-react";
import { getData } from "@/helper/getData";
import ClassroomWithFilters from "@/components/ClassroomWithFilters";

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
          <ClassroomWithFilters
            classrooms={classroom}
            departments={department}
            teachers={teacher}
            bookings={booking.data.booking}
          />
        )}
    </div>
  );
}

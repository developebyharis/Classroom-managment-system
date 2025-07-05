"use client";
import { useState } from "react";
import ClassroomCard from "@/components/classroomCard";
import FilterDropdowns from "@/components/filter/options";

export default function ClassroomFilter({ initialClassrooms, initialDepartments, initialTeachers, initialBookings }) {
  const [selectedDepartment, setSelectedDepartment] = useState("All Department");
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  const departmentNames = [
    "All Department",
    ...initialDepartments.map((d) => d.department_name),
  ];
  const statusOptions = ["All Status", "Available", "Booked"];

  const filteredClassrooms = initialClassrooms?.filter((cls) => {
    let departmentMatch = true;
    if (selectedDepartment !== "All Department") {
      const selectedDept = initialDepartments?.find(d => d.department_name === selectedDepartment);
      departmentMatch = cls.department_id === selectedDept?.id;
    }
    let statusMatch = true;
    if (selectedStatus === "Available") {
      statusMatch = cls.booking_id === null;
    } else if (selectedStatus === "Booked") {
      statusMatch = cls.booking_id !== null;
    }
    return departmentMatch && statusMatch;
  }) || [];

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-8 justify-center">
        <FilterDropdowns
          optionValue={departmentNames}
          value={selectedDepartment}
          onChange={setSelectedDepartment}
          name="Department"
        />
        <FilterDropdowns
          optionValue={statusOptions}
          value={selectedStatus}
          onChange={setSelectedStatus}
          name="Status"
        />
      </div>
      {filteredClassrooms.length === 0 ? (
        <div className="text-center text-gray-400 py-16 text-lg">
          No classrooms found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredClassrooms.map((cls) => {
            const bookingData = cls.booking_id 
              ? initialBookings?.find(b => b.id === cls.booking_id)
              : null;
            const teacherData = bookingData 
              ? initialTeachers?.find(t => t.id === bookingData.teacher_id)
              : (Array.isArray(initialTeachers) ? initialTeachers : [initialTeachers]);
            return (
              <ClassroomCard
                key={cls.id}
                classroom={cls}
                teacher={teacherData}
                department={initialDepartments}
                bookingData={bookingData}
              />
            );
          })}
        </div>
      )}
    </div>
  );
} 
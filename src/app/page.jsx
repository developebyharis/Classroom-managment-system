"use client";
import { useState } from "react";
import ClassroomCard from "@/components/ClassroomCard";
import FilterDropdowns from "@/components/filter/options";
import { classroomsData } from "@/data";

const filters = [
  {
    tagName: "Department",
    options: ["Computer Science", "Software Engineering"],
  },
  {
    tagName: "Status",
    options: ["Booked", "Available"],
  },
];

export default function Home() {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  console.log("Selected Department:", selectedDepartment);
  console.log("Selected Status:", selectedStatus);

  const handleFilterChange = (tag, value) => {
    if (tag === "Department") setSelectedDepartment(value);
    if (tag === "Status") setSelectedStatus(value);
  };
  const filterClassrooms = classroomsData.filter((cls) => {
    const departmentMatch =
      !selectedDepartment ||
      cls.department.toLowerCase() === selectedDepartment.toLowerCase();
    const statusMatch =
      !selectedStatus ||
      cls.status.toLowerCase() === selectedStatus.toLowerCase();
    return departmentMatch && statusMatch;
  });

  return (
    <div>
      <h1 className="text-center text-3xl font-bold">
        Classroom managment system
      </h1>
      <div className="flex gap-4 pt-4 justify-center">
        {filters.map((filter, index) => (
          <FilterDropdowns
            key={index}
            name={filter.tagName}
            optionValue={filter.options}
            value={
              filter.tagName === "Department"
                ? selectedDepartment
                : selectedStatus
            }
            onChange={(value) => handleFilterChange(filter.tagName, value)}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-2 pt-6 px-4">
        {filterClassrooms.map((cls, index) => (
          <div key={index} className="flex">
            <ClassroomCard classroom={cls} />
          </div>
        ))}
      </div>
    </div>
  );
}

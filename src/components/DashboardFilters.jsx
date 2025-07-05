"use client";

import { useState } from "react";
import FilterDropdowns from "@/components/filter/options";

export default function DashboardFilters({
  department,
  onFilterChange,
  initialDepartment = "All Department",
  initialStatus = "Available",
  showStatusFilter = true,
}) {
  const [selectedDepartment, setSelectedDepartment] = useState(initialDepartment);
  const [selectedStatus, setSelectedStatus] = useState(initialStatus);
  const [isOpenForm, setOpenForm] = useState(false);
  const [selectedClassroomId, setSelectedClassroomId] = useState(null);

  const departmentNames = [
    "All Department",
    ...department?.map((d) => d.department_name),
  ];
  
  const STATUS_OPTIONS = ["Available", "Booked"];

  const handleDepartmentChange = (value) => {
    setSelectedDepartment(value);
    onFilterChange({ department: value, status: selectedStatus });
  };

  const handleStatusChange = (value) => {
    setSelectedStatus(value);
    onFilterChange({ department: selectedDepartment, status: value });
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
      <FilterDropdowns
        optionValue={departmentNames}
        value={selectedDepartment}
        onChange={handleDepartmentChange}
        name="Department"
      />
      {showStatusFilter && (
        <FilterDropdowns
          optionValue={STATUS_OPTIONS}
          value={selectedStatus}
          onChange={handleStatusChange}
          name="Status"
        />
      )}
    </div>
  );
} 
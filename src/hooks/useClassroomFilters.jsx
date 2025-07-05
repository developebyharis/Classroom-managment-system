"use client";

import { useState, useMemo } from "react";

export default function useClassroomFilters(classroom, department) {
  const [filters, setFilters] = useState({
    department: "All Department",
    status: "Available",
  });

  const filteredClassrooms = useMemo(() => {
    return classroom?.filter((cls) => {
      let departmentMatch = true;
      if (filters.department !== "All Department") {
        const selectedDept = department?.find(
          (d) => d.department_name === filters.department
        );
        departmentMatch = cls.department_id === selectedDept?.id;
      }
      
      const statusMatch =
        filters.status === "Available"
          ? cls.booking_id === null
          : cls.booking_id !== null;
          
      return departmentMatch && statusMatch;
    }) || [];
  }, [classroom, department, filters]);

  const availableCount = useMemo(() => {
    return filteredClassrooms.filter((c) => c.booking_id === null).length;
  }, [filteredClassrooms]);

  const bookedCount = useMemo(() => {
    return filteredClassrooms.filter((c) => c.booking_id !== null).length;
  }, [filteredClassrooms]);

  const totalAvailableCount = useMemo(() => {
    return classroom.filter((c) => c.booking_id === null).length;
  }, [classroom]);

  const totalBookedCount = useMemo(() => {
    return classroom.filter((c) => c.booking_id !== null).length;
  }, [classroom]);

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return {
    filters,
    filteredClassrooms,
    availableCount,
    bookedCount,
    totalAvailableCount,
    totalBookedCount,
    updateFilters,
  };
} 
"use client"
import ClassroomCard from "@/components/classroomCard";
import useClassroomFilters from "@/hooks/useClassroomFilters";
import DashboardFilters from "./DashboardFilters";
import { useSession } from "next-auth/react";

export default function ClassroomWithFilters({
    classrooms,
    departments,
    teachers,
    bookings,
    setSelectedClassroomId,
    setOpenForm
}) {
    const { filteredClassrooms, updateFilters } = useClassroomFilters(
        classrooms,
        departments
    );
    const { data: session } = useSession()
    const handleOpenBookingForm = (classroomId) => {
        setSelectedClassroomId(classroomId);
        setOpenForm(true);
    };

    return (
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-8 py-8">
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-8 justify-center">
                <DashboardFilters
                    department={departments}
                    onFilterChange={updateFilters}
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
                            ? bookings?.find((b) => b.id === cls.booking_id)
                            : null;
                        const teacherData = bookingData
                            ? teachers?.find((t) => t.id === bookingData.teacher_id)
                            : Array.isArray(teachers)
                                ? teachers
                                : [teachers];
                        return (
                            <ClassroomCard
                                key={cls.id}
                                classroom={cls}
                                teacher={teacherData}
                                department={departments}
                                bookingData={bookingData}
                                setOpenForm={session?.user?.role === "Teacher" ? () => handleOpenBookingForm(cls.id) : () => { }}

                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}

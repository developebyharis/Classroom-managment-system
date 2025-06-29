"use client";
import { useState } from "react";
import ClsBookingForm from "@/components/clsBookingForm";
import BookingCard from "@/components/BookingCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClassroomCard from "@/components/classroomCard";
import FilterDropdowns from "@/components/filter/options";

export default function TeacherDashboardClient({ classroom, department, teacher, booking }) {
  const [isOpenForm, setOpenForm] = useState(false);
  const [selectedClassroomId, setSelectedClassroomId] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState("All Department");
  const [selectedStatus, setSelectedStatus] = useState("Available");

  // For demo, just use all teachers and departments
  const teachers = teacher;
  const depList = department;

  const availableCount = classroom.filter((c) => c.booking_id === null).length;
  const bookedCount = classroom.filter((c) => c.booking_id !== null).length;

  const departmentNames = [
    "All Department",
    ...department?.map((d) => d.department_name),
  ];

  const filteredClassrooms = classroom?.filter((cls) => {
    let departmentMatch = true;
    if (selectedDepartment !== "All Department") {
      const selectedDept = department?.find(d => d.department_name === selectedDepartment);
      departmentMatch = cls.department_id === selectedDept?.id;
    }
    const statusMatch = 
      selectedStatus === "Available" ? cls.booking_id === null : cls.booking_id !== null;
    return departmentMatch && statusMatch;
  }) || [];

  const filteredAvailableCount = filteredClassrooms.filter((c) => c.booking_id === null).length;
  const filteredBookedCount = filteredClassrooms.filter((c) => c.booking_id !== null).length;

  function handleBookClassroom(details) {
    setOpenForm(false);
  }

  const handleOpenBookingForm = (classroomId) => {
    setSelectedClassroomId(classroomId);
    setOpenForm(true);
  };

  return (
    <div className="min-h-screen w-full grid md:grid-cols-[220px_1fr] bg-muted/40">
      <aside className="hidden md:block bg-white border-r px-4 py-6 space-y-4">
        <h1 className="text-2xl font-bold">Faculty</h1>
        <nav className="space-y-1 text-sm">
          <a className="block px-2 py-1 rounded hover:bg-muted" href="#stats">
            Dashboard
          </a>
          <a
            className="block px-2 py-1 rounded hover:bg-muted"
            href="#bookings"
          >
            Bookings
          </a>
          <a
            className="block px-2 py-1 rounded hover:bg-muted"
            href="#available"
          >
            Classrooms
          </a>
        </nav>
      </aside>

      <main className="flex flex-col gap-6 p-6">
        <section id="stats" className="grid sm:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Classrooms
              </CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-bold">
              {classroom.length}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Available</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-bold">
              {selectedStatus === "Available" ? filteredAvailableCount : availableCount}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Your Bookings
              </CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-bold">
              {booking?.length || 0}
            </CardContent>
          </Card>
        </section>

        <section className="bg-white rounded-lg shadow-sm p-4" id="bookings">
          <Tabs defaultValue="yourBookings" className="w-full">
            <TabsList className="flex w-full justify-center mb-4">
              <TabsTrigger value="yourBookings" className="flex-1">
                Your&nbsp;Bookings
              </TabsTrigger>
              <TabsTrigger value="availableClassrooms" className="flex-1">
                Available&nbsp;Classrooms
              </TabsTrigger>
            </TabsList>

            <TabsContent value="yourBookings">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  Your Booked Classrooms
                </h2>
              </div>

              {booking?.length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center text-gray-500">
                    No classrooms booked yet.
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {booking?.map((b, idx) => {
                    const classroomObj = classroom?.find(
                      (c) => c.id === b.classroom_id
                    );
                    const teacherObj = teacher?.find(
                      (t) => t.id === b.teacher_id
                    );
                    return (
                      <BookingCard
                        key={b.id || idx}
                        booking={b}
                        classroom={classroomObj}
                        teacher={teacherObj}
                      />
                    );
                  })}
                </div>
              )}
            </TabsContent>

            <TabsContent value="availableClassrooms" id="available">
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                <FilterDropdowns
                  optionValue={departmentNames}
                  value={selectedDepartment}
                  onChange={setSelectedDepartment}
                  name="Department"
                />
                <FilterDropdowns
                  optionValue={["Available", "Booked"]}
                  value={selectedStatus}
                  onChange={setSelectedStatus}
                  name="Status"
                />
              </div>
              <h2 className="text-xl font-semibold mb-4">
                Available Classrooms
              </h2>
              {filteredClassrooms.length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center text-gray-500">
                    No classrooms available.
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredClassrooms.map((cls) => {
                    const bookingData = cls.booking_id 
                      ? booking?.find(b => b.id === cls.booking_id)
                      : null;
                    const teacherData = bookingData 
                      ? teacher?.find(t => t.id === bookingData.teacher_id)
                      : teachers;
                    return (
                      <ClassroomCard
                        key={cls.id}
                        classroom={cls}
                        teacher={teacherData}
                        department={department}
                        setOpenForm={() => handleOpenBookingForm(cls.id)}
                        bookingData={bookingData}
                      />
                    );
                  })}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </section>
      </main>

      {isOpenForm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <ClsBookingForm
              onSubmit={handleBookClassroom}
              isOpen={isOpenForm}
              setIsOpen={setOpenForm}
              clsId={selectedClassroomId}
              onClose={() => setOpenForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
} 
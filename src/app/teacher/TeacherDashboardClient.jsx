"use client";
import { useState } from "react";
import ClsBookingForm from "@/components/clsBookingForm";
import BookingCard from "@/components/BookingCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClassroomWithFilters from "@/components/ClassroomWithFilters";
import useClassroomFilters from "@/hooks/useClassroomFilters";

export default function TeacherDashboardClient({
  classroom,
  department,
  teacher,
  booking,
}) {
  const [isOpenForm, setOpenForm] = useState();
  const [selectedClassroomId, setSelectedClassroomId] = useState();

  const [activeTab, setActiveTab] = useState("yourBookings");




  const {
    availableCount,
    totalBookedCount,
  } = useClassroomFilters(classroom, department);

  function handleBookClassroom(details) {
    setOpenForm(false);
  }

  // const handleOpenBookingForm = (classroomId) => {
  //   setSelectedClassroomId(classroomId);
  //   setOpenForm(true);
  // };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-56 bg-white border-r flex-shrink-0 sticky top-0 z-20 h-16 md:h-auto md:min-h-screen flex md:flex-col items-center md:items-start px-4 py-2 md:py-8 gap-2 md:gap-2 shadow-sm">
        <Button
          variant={activeTab === "yourBookings" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => setActiveTab("yourBookings")}
        >
          Bookings
        </Button>
        <Button
          variant={activeTab === "availableClassrooms" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => setActiveTab("availableClassrooms")}
        >
          Classrooms
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            Teacher Dashboard
          </h1>
          <p className="text-gray-500">
            View your bookings and available classrooms.
          </p>
        </div>

        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card className="bg-white border border-gray-100 shadow-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Classrooms
              </CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-semibold text-gray-900">
              {classroom.length}
            </CardContent>
          </Card>
          <Card className="bg-white border border-gray-100 shadow-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Available
              </CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-semibold text-gray-900">
              {availableCount}
            </CardContent>
          </Card>
          <Card className="bg-white border border-gray-100 shadow-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Your Bookings
              </CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-semibold text-gray-900">
              {booking?.length || 0}
            </CardContent>
          </Card>
        </section>

        <div className="bg-white/80 rounded-2xl border border-gray-100 p-6">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsContent value="yourBookings">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Your Booked Classrooms
                </h2>
              </div>
              {booking?.length === 0 ? (
                <Card className="bg-gray-50 border-0">
                  <CardContent className="py-8 text-center text-gray-500">
                    No classrooms booked yet.
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <ClassroomWithFilters
                classrooms={classroom}
                departments={department}
                teachers={teacher}
                bookings={booking}
                setSelectedClassroomId={setSelectedClassroomId}
                setOpenForm={setOpenForm}
              />
            </TabsContent>
          </Tabs>
        </div>

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
      </main>
    </div>
  );
}

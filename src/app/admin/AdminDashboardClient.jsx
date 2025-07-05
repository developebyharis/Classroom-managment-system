"use client";
import { useState } from "react";
import ClassroomCard from "@/components/classroomCard";
import TeacherCard from "@/components/TeacherCard";
import AddClassroomForm from "@/components/AddClsForm";
import AddTeacherForm from "@/components/AddTeacherForm";
import FilterDropdowns from "@/components/filter/options";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Users as UsersIcon, } from "lucide-react";
import EditTeacherForm from "@/components/EditTeacherForm";

const STATUS_OPTIONS = ["Available", "Booked"];

export default function AdminDashboardClient({
  classroom,
  department,
  teacher,
  course,
  booking,
  bookingTeachers,
}) {
  const [selectedDepartment, setSelectedDepartment] =
    useState("All Department");
  const [selectedStatus, setSelectedStatus] = useState("Available");
  const [showAddClassroom, setShowAddClassroom] = useState(false);
  const [showAddTeacher, setShowAddTeacher] = useState(false);
  const [activeTab, setActiveTab] = useState("classrooms");
  const [editTeacher, setEditTeacher] = useState(null);

  console.log(editTeacher)
  const departmentNames = [
    "All Department",
    ...department?.map((d) => d.department_name),
  ];
  const filteredClassrooms =
    classroom?.filter((cls) => {
      let departmentMatch = true;
      if (selectedDepartment !== "All Department") {
        const selectedDept = department?.find(
          (d) => d.department_name === selectedDepartment
        );
        departmentMatch = cls.department_id === selectedDept?.id;
      }
      const statusMatch =
        selectedStatus === "Available"
          ? cls.booking_id === null
          : cls.booking_id !== null;
      return departmentMatch && statusMatch;
    }) || [];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex overflow-hidden">
        {/* Main Content */}
        <main className="flex-1 p-4 md:p-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8"></div>

          <div className="">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="w-full max-w-md mx-auto flex justify-center mb-6 bg-muted rounded-lg p-1">
                <TabsTrigger value="classrooms" className="flex-1">
                  Classrooms
                </TabsTrigger>
                <TabsTrigger value="teachers" className="flex-1">
                  Teachers
                </TabsTrigger>
              </TabsList>
               <div className="flex justify-end gap-2 mb-6">
            <Button onClick={() => setShowAddClassroom(true)} variant="outline" className="gap-2">
              <Plus className="w-4 h-4" /> Add Classroom
            </Button>
            <Button onClick={() => setShowAddTeacher(true)} variant="outline" className="gap-2">
              <Plus className="w-4 h-4" /> Add Teacher
            </Button>
          </div>
              <TabsContent value="classrooms">
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                  <FilterDropdowns
                    optionValue={departmentNames}
                    value={selectedDepartment}
                    onChange={setSelectedDepartment}
                    name="Department"
                  />
                  <FilterDropdowns
                    optionValue={STATUS_OPTIONS}
                    value={selectedStatus}
                    onChange={setSelectedStatus}
                    name="Status"
                  />
                </div>
                {filteredClassrooms?.length === 0 ? (
                  <div className="text-center text-gray-500 py-8 border rounded bg-gray-50">
                    No classrooms found.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredClassrooms?.map((cls) => {
                      const bookingData = cls.booking_id
                        ? booking?.find((b) => b.id === cls.booking_id)
                        : null;

                      const teacherData = bookingData
                        ? bookingTeachers?.find(
                            (t) => t.id === bookingData.teacher_id
                          )
                        : teacher.length > 1
                        ? teacher
                        : teacher;

                      return (
                        <ClassroomCard
                          key={cls.id}
                          classroom={cls}
                          teacher={teacherData}
                          department={department}
                          bookingData={bookingData}
                        />
                      );
                    })}
                  </div>
                )}
              </TabsContent>
              <TabsContent value="teachers">
                {teacher.length === 0 ? (
                  <p className="text-center text-gray-500">No teachers yet.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {teacher?.map((t) => (
                      <TeacherCard key={t.id} teacher={t} dep={department} onEdit={(teacher, dep) => setEditTeacher(teacher)} />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Add Classroom Modal */}
          <AddClassroomForm
            isOpen={showAddClassroom}
            onClose={() => setShowAddClassroom(false)}
          />
          {/* Add Teacher Modal */}
          <AddTeacherForm
            isOpen={showAddTeacher}
            onClose={() => setShowAddTeacher(false)}
          />
          {/* Edit Teacher Modal */}
          <EditTeacherForm
            teacher={editTeacher}
            isOpen={!!editTeacher}
            onClose={() => setEditTeacher(null)}
            onSave={() => setEditTeacher(null)}
          
          />
        </main>
      </div>
    </div>
  );
}

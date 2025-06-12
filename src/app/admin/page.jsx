"use client";
import { useState } from "react";
import ClassroomCard from "@/components/classroomCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { classroomsData, filters, teachers } from "@/data";
import AddClassroomForm from "@/components/AddClsForm";
import AddTeacherForm from "@/components/AddTeacherForm";
import FilterDropdowns from "@/components/filter/options";
import TeacherCard from "@/components/TeacherCard";

const departments = [
  "All Department",
  "Computer Science",
  "Software Engineering",
];
const status = ["Available", "Booked"];

export default function AdminPage() {
  const [selectedDepartment, setSelectedDepartment] =
    useState("All Department");
  const [selectStatus, setSelectStatus] = useState("Available");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAddTeacher, setShowAddTeacher] = useState(false);
  const [teachersData, setTeachersData] = useState("");

  const handleAddTeacher = (teacher) => {
    setTeachersData([teacher, ...teachersData]);
  };
  console.log("data", teachersData);
  const filteredClassrooms = classroomsData.filter(
    (cls) =>
      (selectedDepartment === "All Department" ||
        cls.department === selectedDepartment) &&
      cls.status === selectStatus
  );

  return (
    <div className="py-10 px-4">
      <Tabs defaultValue="classrooms" className="w-full">
        <TabsList className="w-full max-w-sm mx-auto flex justify-center mb-6">
          <TabsTrigger value="classrooms" className="flex-1">
            Classrooms
          </TabsTrigger>
          <TabsTrigger value="teachers" className="flex-1">
            Teachers
          </TabsTrigger>
        </TabsList>
        <TabsContent value="classrooms">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <FilterDropdowns
              optionValue={departments}
              value={selectedDepartment}
              onChange={(value) => setSelectedDepartment(value)}
            />
            <FilterDropdowns
              optionValue={status}
              value={selectStatus}
              onChange={(value) => setSelectStatus(value)}
            />

            <div className="flex gap-2 md:ml-auto">
              <Button onClick={() => setShowAddForm(true)}>
                Add Classroom
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            {filteredClassrooms.length === 0 ? (
              <div className="text-center text-gray-500 py-8 border rounded bg-gray-50">
                No classrooms found.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-2 px-1">
                {filteredClassrooms.map((cls, idx) => (
                  <div key={idx} className="flex">
                    <ClassroomCard classroom={cls} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="teachers">
          <div className="flex justify-end mb-4">
            <Button onClick={() => setShowAddTeacher(true)}>Add Teacher</Button>
          </div>

          {teachersData && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-6">
              {teachersData.map((teacher, index) => (
                <div key={index} className="flex">
                  <TeacherCard teacher={teacher} />
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
      <AddClassroomForm
        isOpen={showAddForm}
        onClose={() => setShowAddForm(false)}
      />
      <AddTeacherForm
        isOpen={showAddTeacher}
        onClose={() => setShowAddTeacher(false)}
        onAdd={handleAddTeacher}
      />
    </div>
  );
}

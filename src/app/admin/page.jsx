"use client";
import { useState } from "react";
import ClassroomCard from "@/components/classroomCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { classroomsData, teachers } from "@/data";
import AddClassroomForm from "@/components/AddClsForm";
import AddTeacherForm from "@/components/AddTeacherForm";
import FilterDropdowns from "@/components/filter/options";

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
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h1>
      <Tabs defaultValue="classrooms" className="w-full">
        <TabsList className="w-full flex justify-center mb-6">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-2 pt-6 px-4">
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
          <ul className="divide-y border rounded bg-white">
            {teachers.slice(1).map((t) => (
              <li
                key={t}
                className="px-4 py-3 flex justify-between items-center"
              >
                <span>{t}</span>
                <Button size="sm" variant="outline">
                  Edit
                </Button>
              </li>
            ))}
          </ul>
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

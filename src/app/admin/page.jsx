"use client";
import { useState } from "react";

import ClassroomCard from "@/components/classroomCard";
import TeacherCard   from "@/components/TeacherCard";
import AddClassroomForm from "@/components/AddClsForm";
import AddTeacherForm   from "@/components/AddTeacherForm";
import FilterDropdowns  from "@/components/filter/options";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useTeacher   } from "@/hooks/useTeacher";
import { useClassroom } from "@/hooks/useClassroom";

const STATUS_OPTIONS = ["Available", "Booked"];

export default function AdminPage() {
 
  const [selectedDepartment, setSelectedDepartment] = useState("All Department");
  const [selectedStatus,     setSelectedStatus    ] = useState("Available");
  const [showAddClassroom,   setShowAddClassroom  ] = useState(false);
  const [showAddTeacher,     setShowAddTeacher    ] = useState(false);

  
  const { classroom: classroomRes, loading: clsLoading   } = useClassroom();
  const { teacher  : teacherRes  , loading: tchLoading   } = useTeacher();

 
  if (clsLoading || tchLoading) {
    return <p className="p-10 text-center">Loading…</p>;
  }
  if (!classroomRes?.data || !teacherRes) {
    return <p className="p-10 text-center text-red-600">
      Failed to load data from server.
    </p>;
  }

  const { classroom, department } = classroomRes.data;  
  const { teacher: teachers, dep: depList } = teacherRes; 

 
  const departmentNames = [
    "All Department",
    ...department.map(d => d.department_name)
  ];

 
  const filteredClassrooms = classroom.filter(cls => {
    const depObj = department.find(d => d.id === cls.department_id);
    const depName = depObj?.department_name ?? "";
console.log(depObj, depName);
    const matchesDept =
      selectedDepartment === "All Department" ||
      depName === selectedDepartment;
console.log(matchesDept)
    const matchesStatus =
      !selectedStatus || cls.status === selectedStatus;
console.log(matchesDept,matchesStatus )
    return matchesDept && matchesStatus;
  });

  console.log("f",filteredClassrooms)
  
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

            <div className="flex gap-2 md:ml-auto">
              <Button onClick={() => setShowAddClassroom(true)}>
                Add Classroom
              </Button>
            </div>
          </div>

          {filteredClassrooms.length === 0 ? (
            <div className="text-center text-gray-500 py-8 border rounded bg-gray-50">
              No classrooms found.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-2 px-1">
              {filteredClassrooms.map(cls => (
                <ClassroomCard key={cls.id} classroom={cls} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="teachers">
          <div className="flex justify-end mb-4">
            <Button onClick={() => setShowAddTeacher(true)}>Add Teacher</Button>
          </div>

          {teachers.length === 0 ? (
            <p className="text-center text-gray-500">No teachers yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-6">
              {teachers.map(t => (
                <TeacherCard
                  key={t.id}
                  teacher={t}
                  dep={depList}    
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <AddClassroomForm
        isOpen={showAddClassroom}
        onClose={() => setShowAddClassroom(false)}
      />
      <AddTeacherForm
        isOpen={showAddTeacher}
        onClose={() => setShowAddTeacher(false)}
      />
    </div>
  );
}

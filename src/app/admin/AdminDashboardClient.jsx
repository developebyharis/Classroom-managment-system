"use client";
import { useState } from "react";
import TeacherCard from "@/components/TeacherCard";
import AddClassroomForm from "@/components/AddClsForm";
import AddTeacherForm from "@/components/AddTeacherForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import EditTeacherForm from "@/components/EditTeacherForm";
import useClassroomFilters from "@/hooks/useClassroomFilters";
import ClassroomWithFilters from "@/components/ClassroomWithFilters";
import { useTeacher } from "@/hooks/useTeacher";
export default function AdminDashboardClient({
  classroom,
  department,
  teacher,
  matchedDepartment,
  booking,
}) {
  const [showAddClassroom, setShowAddClassroom] = useState(false);
  const [showAddTeacher, setShowAddTeacher] = useState(false);
  const [activeTab, setActiveTab] = useState("classrooms");
  const [editTeacher, setEditTeacher] = useState(null);

  const {deleteTeacher} = useTeacher()
  const totalClassrooms = classroom.length;
  const totalTeachers = teacher.length;
  const {
    availableCount,
    totalBookedCount,
  } = useClassroomFilters(classroom, department);
  const statsData = [
    {
      title: "Total Classrooms",
      value: totalClassrooms,
      icon: "🏫"
    },
    {
      title: "Available",
      value: availableCount,
      icon: "✅"
    },
    {
      title: "Total Booking",
      value: totalBookedCount,
      icon: "📅"
    },
    {
      title: "Total Teachers",
      value: totalTeachers,
      icon: "👨‍🏫"
    }
  ];
 
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex overflow-hidden">
        {/* Main Content */}
        <main className="flex-1 p-4 md:p-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              Admin Dashboard
            </h1>
            <p className="text-gray-500">
              Manage classrooms and teachers.
            </p>
          </div>
          <section className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
            {statsData.map((stat, index) => (
              <Card key={index} className="bg-white border border-gray-100 shadow-none">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2">
                    <span>{stat.icon}</span>
                    {stat.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-3xl font-semibold text-gray-900">
                  {stat.value}
                </CardContent>
              </Card>
            ))}
          </section>

          <div className="bg-white/80 rounded-2xl border border-gray-100 p-6">
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
                <ClassroomWithFilters
                  classrooms={classroom}
                  departments={department}
                  teachers={teacher}
                  bookings={booking}
                />
              </TabsContent>
              <TabsContent value="teachers">
                {teacher.length === 0 ? (
                  <p className="text-center text-gray-500">No teachers yet.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {teacher?.map((t) => (
                      <TeacherCard
                        key={t.id}
                        teacher={t}
                        dep={matchedDepartment}
                        onEdit={(teacher) => setEditTeacher(teacher)}
                        onDelete={() => deleteTeacher(t.id)}
                      />
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

"use client";
import { useState } from "react";
import ClsBookingForm from "@/components/clsBookingForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClassroomCard from "@/components/classroomCard";
import { classroomsData } from "@/data";

const availableClassrooms = [
  { name: "Room B-202", capacity: 40 },
  { name: "Room C-105", capacity: 30 },
  { name: "Room D-301", capacity: 50 },
];

export default function TeacherPage() {
  const [openForm, setIsOpenForm] = useState(false);
  const [booked, setBooked] = useState([]);

  function handleBookClassroom(details) {
    setBooked([...booked, details]);
    setIsOpenForm(false);
  }

  return (
    <div className="px-4 py-10">
      <Tabs defaultValue="yourBookings" className="w-full">
        <TabsList className="max-w-xl mx-auto flex justify-center mb-6">
          <TabsTrigger value="yourBookings" className="flex-1">
            Your Bookings
          </TabsTrigger>
          <TabsTrigger value="availableClassrooms" className="flex-1">
            Available Classrooms
          </TabsTrigger>
        </TabsList>
        <TabsContent value="yourBookings">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Your Booked Classrooms</h2>
            <Button size="sm" onClick={() => setIsOpenForm(true)}>
              + Book
            </Button>
          </div>
          {booked.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-gray-500">
                No classrooms booked yet.
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {booked.map((cls, idx) => (
                <ClassroomCard key={idx} {...cls} />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="availableClassrooms">
          <h2 className="text-xl font-semibold mb-4">Available Classrooms</h2>
          <ul className="divide-y">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-2">
              {classroomsData
                .filter((cls) => cls.status.toLowerCase() === "available")
                .map((cls, index) => (
                  <ClassroomCard key={index} classroom={cls} />
                ))}
            </div>
          </ul>
        </TabsContent>
      </Tabs>
      {/* Booking Form Modal */}
      {openForm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <ClsBookingForm
              onSubmit={handleBookClassroom}
              isOpen={openForm}
              setIsOpen={setIsOpenForm}
              onClose={() => setIsOpenForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

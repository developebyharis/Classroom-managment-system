"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Clock, User, GraduationCap, Users, Building, BookOpen } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import BookingBtn from "./BookingBtn";

export default function ClassroomCard({
  classroom,
  teacher,
  department,
  setOpenForm,
  bookingData,
}) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const matchedDepartment = department?.find(
    (d) => d.id === classroom?.department_id
  );

  const departmentName = matchedDepartment?.department_name || "N/A";

  const getStatusColor = (status) => {
    switch (status.toLowerCase().trim()) {
      case "available":
        return "bg-green-100 text-green-800 border-green-200";
      case "booked":
        return "bg-red-100 text-red-800 border-red-200";
      case "maintenance":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return "N/A";
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const isAvailable = classroom.booking_id === null;
  const status = isAvailable ? "Available" : "Booked";

  return (
    <div>
      <Card className="w-full h-full flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1 min-w-0 flex-1">
              <CardTitle className="text-lg leading-tight">
                {classroom.name}
              </CardTitle>
              <CardDescription className="text-sm truncate flex items-center gap-2">
                {isAvailable ? (
                  <>
                    <Building className="h-3 w-3" />
                    {departmentName}
                  </>
                ) : (
                  <>
                    <BookOpen className="h-3 w-3" />
                    {bookingData?.course || "Booked"}
                  </>
                )}
              </CardDescription>
            </div>
            <Badge
              variant="outline"
              className={`ml-2 flex-shrink-0 ${getStatusColor(status)}`}
            >
              {status}
            </Badge>
          </div>
        </CardHeader>

        {!isAvailable && bookingData && (
          <CardContent className="space-y-4 flex-1">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">Teacher</p>
                  <p className="text-sm text-muted-foreground truncate">
                    {teacher?.name || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">Time Slot</p>
                  <p className="text-sm text-muted-foreground">
                    {formatTime(bookingData.time_from)} - {formatTime(bookingData.time_to)}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <GraduationCap className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-medium">Semester</p>
                  <p className="text-xs text-muted-foreground">
                    {bookingData.semester || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-medium">Section</p>
                  <p className="text-xs text-muted-foreground">
                    {bookingData.section || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Building className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">Department</p>
                <p className="text-sm text-muted-foreground truncate">
                  {departmentName}
                </p>
              </div>
            </div>
          </CardContent>
        )}
        <BookingBtn setOpenForm={setOpenForm} clsId={classroom.id} />
      </Card>
    </div>
  );
}

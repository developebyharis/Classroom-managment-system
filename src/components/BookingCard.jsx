"use server";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, GraduationCap, BookOpen, X } from "lucide-react";
import { formatTime, getStatusColor } from "@/lib/utils";
import { deleteBooking } from "@/lib/server/booking";

export default async function BookingCard({ booking, classroom }) {
  const handleUnbook = async () => {
    await deleteBooking(booking.id);
  };

  return (
    <Card className="w-full hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1 min-w-0 flex-1">
            <CardTitle className="text-lg leading-tight flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-600" />
              {classroom?.name || `Room ${booking.classroom_id}`}
            </CardTitle>
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <BookOpen className="h-3 w-3" />
              {booking.course}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className={`flex-shrink-0 ${getStatusColor(booking.status)}`}
            >
              {booking.status}
            </Badge>
            {booking.status?.toLowerCase() === "booked" && (
              <Button
                size="sm"
                variant="outline"
                onClick={handleUnbook}
                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                title="Unbook this classroom"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-medium">Time</p>
              <p className="text-xs text-muted-foreground">
                {formatTime(booking.time_from)} - {formatTime(booking.time_to)}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-medium">Semester</p>
              <p className="text-xs text-muted-foreground">
                {booking.semester}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 text-muted-foreground flex-shrink-0 flex items-center justify-center">
              <span className="text-xs font-bold">S</span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium">Section</p>
              <p className="text-xs text-muted-foreground">{booking.section}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

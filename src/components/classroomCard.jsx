import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Clock, User, GraduationCap, Users, Building } from "lucide-react";

export default function ClassroomCard({ classroom }) {
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

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1 min-w-0 flex-1">
            <CardTitle className="text-lg leading-tight">
              {classroom.classroomName}
            </CardTitle>
            <CardDescription className="text-sm truncate">
              {classroom.subject}
            </CardDescription>
          </div>
          <Badge
            variant="outline"
            className={`ml-2 flex-shrink-0 ${getStatusColor(classroom.status)}`}
          >
            {classroom.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 flex-1">
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">Teacher</p>
              <p className="text-sm text-muted-foreground truncate">
                {classroom.teacherName}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">Time Slot</p>
              <p className="text-sm text-muted-foreground">
                {classroom.timeSlot}
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
                {classroom.semester}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-medium">Section</p>
              <p className="text-xs text-muted-foreground">
                {classroom.section}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Building className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium">Department</p>
            <p className="text-sm text-muted-foreground truncate">
              {classroom.department}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

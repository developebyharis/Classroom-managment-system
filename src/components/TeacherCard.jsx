"use client"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Phone,
  Mail,
  Building,
  Users,
  GraduationCap,
  User,
  Eye,
  Pencil,
  Trash2,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getDepartmentColor } from "@/lib/utils";

export default function TeacherCard({
  teacher,
  matchedDepartment,
  onEdit,
  onDelete,
}) {
  if (!teacher) {
    console.error("TeacherCard: 'teacher' prop is undefined or null.");
    return null;
  }
  const departments = matchedDepartment ? [matchedDepartment.department_name] : [];

  const sections = Array.isArray(teacher?.section)
    ? teacher.section
    : teacher?.section
      ? [teacher.section]
      : [];

  const semesters = Array.isArray(teacher?.semester)
    ? teacher.semester
    : teacher?.semester
      ? [teacher.semester]
      : [];

  return (
    <Card className="w-full h-full border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-xl">
      <CardHeader className="pb-3 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <User className="w-5 h-5 text-gray-500" />
          </div>
          <div>
            <CardTitle className="text-base font-semibold text-gray-900">
              {teacher.name || "N/A"}
            </CardTitle>
            <p className="text-xs text-gray-500">Teacher</p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-primary"
            >
              <MoreVertical className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-36">
            <DropdownMenuItem onClick={() => onEdit(teacher)}>
              <Pencil className="w-4 h-4 mr-2" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete?.(teacher)}
              className="text-red-600"
            >
              <Trash2 className="w-4 h-4 mr-2" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="space-y-5 text-sm text-gray-900">
        <div className="space-y-2">
          <InfoRow
            icon={Phone}
            label="Mobile"
            value={teacher.phone || "N/A"}
          />
          <InfoRow icon={Mail} label="Email" value={teacher.email || "N/A"} />
        </div>

        <Separator />

        <div className="space-y-2">
          <div>
            <LabelWithIcon icon={Building} label="Department" />
            <div className="flex flex-wrap gap-1 mt-1">
              {departments.length > 0 ? (
                departments?.map((dep, i) => (
                  <Badge
                    key={i}
                    className={`text-xs font-medium px-2 py-0.5 ${getDepartmentColor(
                      dep
                    )} border-0`}
                  >
                    {dep}
                  </Badge>
                ))
              ) : (
                <Badge
                  className={`text-xs font-medium px-2 py-0.5 ${getDepartmentColor(
                    departments
                  )} border-0`}
                >
                  {departments}
                </Badge>
              )}
            </div>
          </div>
          <InfoRow
            icon={Users}
            label="Section"
            value={sections.join(", ") || "N/A"}
          />
          <InfoRow
            icon={GraduationCap}
            label="Semester"
            value={semesters.join(", ") || "N/A"}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="w-4 h-4 text-gray-400 mt-0.5" />
      <div className="flex flex-col">
        <span className="text-xs text-gray-500">{label}</span>
        <span className="text-sm text-gray-900">{value}</span>
      </div>
    </div>
  );
}

function LabelWithIcon({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-wide">
      <Icon className="w-4 h-4 text-gray-400" />
      {label}
    </div>
  );
}

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}



 export const formatTime = (timeString) => {
    if (!timeString) return "N/A";
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };


  export const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "booked":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };


  export const getDepartmentColor = (department) => {
    if (!department) return "bg-muted text-muted-foreground";
    const dep = Array.isArray(department) ? department[0] : department;
    switch (dep?.toLowerCase()) {
      case "computer science":
        return "bg-blue-100 text-blue-800";
      case "electrical":
        return "bg-yellow-100 text-yellow-800";
      case "mechanical":
        return "bg-green-100 text-green-800";
      case "civil":
        return "bg-purple-100 text-purple-800";
      case "mathematics":
        return "bg-pink-100 text-pink-800";
      case "data science":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
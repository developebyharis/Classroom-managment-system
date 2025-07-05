import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import FilterDropdowns from "./filter/options";
import { useClassroom } from "@/hooks/useClassroom";
import axios from "axios";
import { useTeacher } from "@/hooks/useTeacher";
import { useSonnerToast } from "@/hooks/useSonnerToast";
import { useDepartments } from "@/hooks/useDepartments";

function generateRandomString(length = 8) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

export default function AddTeacherForm({ isOpen, onClose }) {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    department: "",
    section: "",
    semester: "",
    course: "",
    course_code: "",
    username: "",
    password: "",
  });

  const { departments } = useDepartments()
  const { addTeacher } = useTeacher()
  const { success, error: showError, loading: showLoading } = useSonnerToast();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

console.log(departments)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username =
      form.name.replace(/\s+/g, "").toLowerCase().slice(0, 5) +
      generateRandomString(3);
    const password = generateRandomString(8);

    const teacherData = {
      ...form,
      department: form.department.split(",").map((d) => d.trim()),
      section: form.section.split(",").map((s) => s.trim()),
      semester: form.semester.split(",").map((s) => s.trim()),
      username: username,
      password: password,
    };

    try {
      showLoading("Adding teacher...");
      await addTeacher(teacherData);
      success("Teacher added successfully");
      setForm({
        name: "",
        mobile: "",
        email: "",
        department: "",
        course: "",
        course_code: "",
        section: "",
        semester: "",
        username: "",
        password: "",
      });
      onClose();
    } catch (err) {
      showError("Failed to add teacher");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
          aria-label="Close"
          type="button"
        >
          &times;
        </button>
        <h2 className="text-lg font-semibold mb-4 text-center">Add Teacher</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="border rounded px-3 py-2 w-full"
            name="name"
            placeholder="Teacher Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            className="border rounded px-3 py-2 w-full"
            name="mobile"
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={handleChange}
            required
          />
          <input
            className="border rounded px-3 py-2 w-full"
            name="email"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <FilterDropdowns
            name={"Department"}
            optionValue={departments.map((dep) => dep.department_name)}
            value={form.department}
            onChange={(val) => setForm({ ...form, department: val })}
          />
          <input
            className="border rounded px-3 py-2 w-full"
            name="semester"
            placeholder="Semester(s) (comma separated)"
            value={form.semester}
            onChange={handleChange}
            required
          />
          <input
            className="border rounded px-3 py-2 w-full"
            name="course"
            placeholder="course"
            value={form.course}
            onChange={handleChange}
            required
          />
          <input
            className="border rounded px-3 py-2 w-full"
            name="course_code"
            placeholder="course_code"
            value={form.course_code}
            onChange={handleChange}
            required
          />
          <input
            className="border rounded px-3 py-2 w-full"
            name="section"
            placeholder="section(s) (comma separated)"
            value={form.section}
            onChange={handleChange}
            required
          />
          <Button type="submit" className="w-full mt-2">
            Add Teacher
          </Button>
        </form>
      </div>
    </div>
  );
}

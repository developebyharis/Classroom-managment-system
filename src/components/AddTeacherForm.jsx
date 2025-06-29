import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import FilterDropdowns from "./filter/options";
import { useClassroom } from "@/hooks/useClassroom";
import axios from "axios";

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

  const { classroom, loading } = useClassroom();
  const [department, setDepartment] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!loading) {
      const dep = classroom.data.department;
      const mappedDep = dep.map((depar) => depar.department_name);
      setDepartment(mappedDep);
    } else {
      console.log("loading..");
    }
  }, [classroom]);

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
      const res = await axios.post("/api/teacher", teacherData, {
        header: "Content-Type : application/json",
      });
      if (res.ok) {
        alert("Teacher Added successfully");
      }
    } catch (err) {
      console.log(err);
    }

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
            optionValue={department}
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

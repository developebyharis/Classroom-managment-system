import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useTeacher } from "@/hooks/useTeacher";
import { useDepartments } from "@/hooks/useDepartments";
import { useCourses } from "@/hooks/useCourses";

export default function EditTeacherForm({ teacher, isOpen, onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    department: "",
    section: "",
    semester: "",
    course: "",
    course_code: "",
  });
  const { updateTeacher } = useTeacher();
  const { departments, loading: departmentsLoading } = useDepartments();
  const { courses, loading: coursesLoading } = useCourses();
  const [matchedDepartment, setMatchedDepartment] = useState(null);
  const [matchedCourse, setMatchedCourse] = useState({});

  useEffect(() => {
    if (teacher?.department_id && departments.length > 0) {
      const matchDep = departments.find((dept) => dept.id === teacher.department_id);
      setMatchedDepartment(matchDep.department_name);
      console.log("Matched Department:", matchDep);
    }
  }, [teacher, departments]);

  useEffect(() => {
    if (teacher?.course_id && courses.length > 0) {
      const matchCourse = courses.find((course) => course.id === teacher.course_id);
      console.log("Match Course:", matchCourse);
      setMatchedCourse(matchCourse);
      console.log("Matched Course:", matchedCourse);
    }
  }, [teacher, courses]);

  useEffect(() => {
    if (teacher) {
      setForm({
        name: teacher.name || "",
        mobile: teacher.phone || "",
        email: teacher.email || "",
        department: matchedDepartment || "",
        section: Array.isArray(teacher.section)
          ? teacher.section.join(", ")
          : teacher.section || "",
        semester: Array.isArray(teacher.semester)
          ? teacher.semester.join(", ")
          : teacher.semester || "",
        course: matchedCourse.course_name || "",
        course_code: matchedCourse.course_code || "",
      });
    }
  }, [teacher, matchedDepartment, matchedCourse]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      ...teacher,
      ...form,
      department: form.department.split(",").map((d) => d.trim()),
      section: form.section.split(",").map((s) => s.trim()),
      semester: form.semester.split(",").map((s) => s.trim()),
    };
    await updateTeacher(updatedData);
    if (onSave) onSave(updatedData);
    onClose();
  };

  if (!isOpen) return null;

  if (departmentsLoading || coursesLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
          <div className="text-center">Loading data...</div>
        </div>
      </div>
    );
  }

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
        <h2 className="text-lg font-semibold mb-4 text-center">Edit Teacher</h2>
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
          <input
            className="border rounded px-3 py-2 w-full"
            name="department"
            placeholder="Department(s) (comma separated)"
            value={form.department}
            onChange={handleChange}
            required
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
            placeholder="Courses name(s) (comma separated)"
            value={form.course}
            onChange={handleChange}
            required
          />
          <input
            className="border rounded px-3 py-2 w-full"
            name="course"
            placeholder="Courses code(s) (comma separated)"
            value={form.course_code}
            onChange={handleChange}
            required
          />

          <input
            className="border rounded px-3 py-2 w-full"
            name="section"
            placeholder="Section(s) (comma separated)"
            value={form.section}
            onChange={handleChange}
            required
          />
          <Button type="submit" className="w-full mt-2">
            Save
          </Button>
        </form>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useClassroom } from "@/hooks/useClassroom";

export default function AddClassroomForm({
  isOpen,
  onClose,
  onAdd,
  departments = [],
}) {
  const [form, setForm] = useState({
    classroomName: "",
    department: "",
  });
  const { classroom, loading } = useClassroom();
  const [department, setDepartment] = useState([]);
  useEffect(() => {
    if (!loading) {
      const dep = classroom.data.department;
      const mappedDep = dep.map((depar) => depar.department_name);
      setDepartment(mappedDep);
    } else {
      console.log("loading..");
    }
  }, [classroom]);

  const [newDepartment, setNewDepartment] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDepartmentSelect = (e) => {
    setForm({ ...form, department: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/classroom`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const data = await res.json();
        if (onAdd) onAdd(data);
        setForm({
          classroomName: "",
          department: "",
        });
        setNewDepartment(false);
        onClose();
      } else {
        const errorData = await res.json();
        alert("Failed to add classroom: " + (errorData.message || res.status));
      }
    } catch (err) {
      alert("Error: " + err.message);
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
        <h2 className="text-lg font-semibold mb-4 text-center">
          Add Classroom
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="border rounded px-3 py-2 w-full"
            name="classroomName"
            placeholder="Classroom Name"
            value={form.classroomName}
            onChange={handleChange}
            required
          />
          {newDepartment ? (
            <div className="flex w-full gap-2">
              <input
                className="border rounded px-3 py-2 w-full"
                name="department"
                placeholder="New Department"
                value={form.department}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => {
                  setNewDepartment(false);
                  setForm({ ...form, department: "" });
                }}
                className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 focus:outline-none"
                title="Cancel"
              >
                &times;
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                type="button"
                onClick={() => setNewDepartment(true)}
                className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 focus:outline-none"
                title="Add new department"
              >
                +
              </Button>
              <select
                className="border rounded px-3 py-2 w-full"
                name="department"
                value={form.department}
                onChange={handleDepartmentSelect}
                required
              >
                <option value="">Select Department</option>
                {department.map((dep, idx) => (
                  <option key={idx} value={dep}>
                    {dep}
                  </option>
                ))}
              </select>
            </div>
          )}
          <Button type="submit" className="w-full mt-2">
            Add Classroom
          </Button>
        </form>
      </div>
    </div>
  );
}

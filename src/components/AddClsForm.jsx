import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useClassroom } from "@/hooks/useClassroom";
import { useSonnerToast } from "@/hooks/useSonnerToast";
import { useDepartments } from "@/hooks/useDepartments";

export default function AddClassroomForm({
  isOpen,
  onClose,
}) {
  const [form, setForm] = useState({
    classroomName: "",
    department: "",
  });
  const { departments } = useDepartments()

  const { addClassroom } = useClassroom();
  const { success, error: showError, loading: showLoading } = useSonnerToast();
 

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
      showLoading("Adding classroom...");
      await addClassroom(form);
      success("Classroom added successfully");
      onClose();
    } catch (err) {
      showError("Failed to add classroom");
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
                {departments.map((dep, idx) => (
                  <option key={idx} value={dep}>
                    {dep.department_name}
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

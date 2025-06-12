import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function AddClassroomForm({ isOpen, onClose, onAdd }) {
  const [form, setForm] = useState({
    classroomName: "",
    department: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
    setForm({
      classroomName: "",
      department: "",
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
          <input
            className="border rounded px-3 py-2 w-full"
            name="department"
            placeholder="Department"
            value={form.department}
            onChange={handleChange}
            required
          />

          <Button type="submit" className="w-full mt-2">
            Add Classroom
          </Button>
        </form>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Button } from "./ui/button";

const availableClassrooms = [
  { name: "Room B-202", capacity: 40 },
  { name: "Room C-105", capacity: 30 },
  { name: "Room D-301", capacity: 50 },
];

export default function ClsBookingForm({ isOpen, setIsOpen }) {
  const [form, setForm] = useState({
    classroom: "",
    subject: "",
    time: "",
    semester: "",
    section: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBook = (e) => {
    e.preventDefault();
    if (
      form.classroom &&
      form.subject &&
      form.time &&
      form.semester &&
      form.section
    ) {
      // You can call a parent handler here if needed
      setForm({
        classroom: "",
        subject: "",
        time: "",
        semester: "",
        section: "",
      });
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
          aria-label="Close"
          type="button"
        >
          &times;
        </button>
        <h2 className="text-lg font-semibold mb-4 text-center">
          Book a Classroom
        </h2>
        <form onSubmit={handleBook} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Classroom</label>
            <select
              name="classroom"
              value={form.classroom}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200"
              required
            >
              <option value="">Select Classroom</option>
              {availableClassrooms.map((room) => (
                <option key={room.name} value={room.name}>
                  {room.name} (Capacity: {room.capacity})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Subject</label>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Time</label>
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block mb-1 text-sm font-medium">Semester</label>
              <input
                type="number"
                name="semester"
                value={form.semester}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 text-sm font-medium">Section</label>
              <input
                type="text"
                name="section"
                value={form.section}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full mt-2">
            Book Classroom
          </Button>
        </form>
      </div>
    </div>
  );
}

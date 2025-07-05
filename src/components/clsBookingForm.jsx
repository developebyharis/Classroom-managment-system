"use client";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { useTeacher } from "@/hooks/useTeacher";
import { useBooking } from "@/hooks/useBooking";
import { useSonnerToast } from "@/hooks/useSonnerToast";

export default function ClsBookingForm({ isOpen, setIsOpen, clsId }) {
  const { teacher: matchedTe, loading, error } = useTeacher();
  const tec = matchedTe?.matchedTeach;
  const teacher_id = tec?.id || "";

  const [form, setForm] = useState({
    classroom_id: clsId || "",
    teacher_id: teacher_id || "",
    timeFrom: "",
    timeTo: "",
    semester: "",
    section: "",
    course: "",
  });

  const { addBooking } = useBooking();
  const { success, error: showError, loading: showLoading } = useSonnerToast();

  const courses_name = (matchedTe?.matchedCourse?.course_name || "")
    .split(",")
    .map((s) => s.trim());

  const courses_code = (matchedTe?.matchedCourse?.course_code || "")
    .split(",")
    .map((s) => s.trim());

  const courses = { courses_name, courses_code };
  console.log("courses", courses);

  const section = (tec?.section || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const semester = (tec?.semester || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  useEffect(() => {
    if (clsId) {
      setForm((prev) => ({ ...prev, classroom_id: clsId }));
    }
    if (teacher_id) {
      setForm((prev) => ({ ...prev, teacher_id: teacher_id }));
    }
  }, [clsId, teacher_id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  console.log({ form });
  const handleBook = async (e) => {
    e.preventDefault();
    // console.log("clsid", clsId);
    const allFieldsFilled = Object.values(form).every((val) => val !== "");
    if (!allFieldsFilled) {
      showError("Please fill all fields");
      return;
    }
    console.log("Booking Info:", form);
    try {
      showLoading("Booking classroom...");
      await addBooking(form);
      success("Classroom booked successfully");
      setForm({
        classroom_id: "",
        teacher_id: "",
        timeFrom: "",
        timeTo: "",
        semester: "",
        section: "",
        course: "",
      });
      setIsOpen(false);
    } catch (err) {
      showError("Failed to book classroom");
    }
  };

  if (!isOpen) return null;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className="text-lg font-semibold mb-4 text-center">
          Book a Classroom
        </h2>

        {clsId && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Selected Classroom ID:</strong> {clsId}
            </p>
          </div>
        )}

        <form onSubmit={handleBook} className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block mb-1 text-sm font-medium">
                From Time
              </label>
              <input
                type="time"
                name="timeFrom"
                value={form.timeFrom}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 text-sm font-medium">To Time</label>
              <input
                type="time"
                name="timeTo"
                value={form.timeTo}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full"
                required
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block mb-1 text-sm font-medium">Course</label>
              <select
                name="course"
                value={form.course}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full"
                required
              >
                <option value="">Select Course</option>
                {Array.isArray(courses.courses_name) &&
                Array.isArray(courses.courses_code) &&
                courses.courses_name.length > 0 ? (
                  courses.courses_name.map((name, idx) => (
                    <option key={courses.courses_code[idx]} value={name}>
                      {courses.courses_code[idx]} - {name}
                    </option>
                  ))
                ) : (
                  <option value="">No courses available</option>
                )}
              </select>
            </div>

            <div className="flex-1">
              <label className="block mb-1 text-sm font-medium">section</label>
              <select
                name="section"
                value={form.section}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full"
                required
              >
                <option value="">Select Section</option>
                {section?.length > 0 ? (
                  section?.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))
                ) : (
                  <option key={section} value={section}>
                    {section}
                  </option>
                )}
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <label className=" text-sm font-medium">Semester</label>
            <select
              name="semester"
              value={form.semester}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
              required
            >
              <option value="">Select Semester</option>
              {semester?.length > 0 ? (
                semester?.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))
              ) : (
                <option key={semester} value={semester}>
                  {semester}
                </option>
              )}
            </select>
          </div>

          <Button type="submit" className="w-full mt-2">
            Book Classroom
          </Button>
        </form>
      </div>
    </div>
  );
}

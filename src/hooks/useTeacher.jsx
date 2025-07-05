"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSonnerToast } from "@/hooks/useSonnerToast";

export function useTeacher() {
  const { data: session } = useSession();
  const [teacher, setTeacher] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { success, error: showError, loading: showLoading } = useSonnerToast();

  async function getTeacher() {
    try {
      showLoading("Loading teacher data...");
      setLoading(true);
      const res = await axios.get(`api/teacher`);
      const teacherData = res.data.teacher;
      if (session?.user?.role === "Teacher") {
        const matchedTeach = teacherData.teacher.find(
          (t) => t.credentials_id === session?.user?.id
        );
        const matchedDep = teacherData.dep.find(
          (d) => d.id === matchedTeach.department_id
        );
        const matchedCourse = teacherData.course.find(
          (d) => d.id === matchedTeach.course_id
        );
        setTeacher({ matchedTeach, matchedDep, matchedCourse });
      } else {
        setTeacher({
          teacher: Array.isArray(teacherData.teacher)
            ? teacherData.teacher
            : [],
          department: Array.isArray(teacherData.dep) ? teacherData.dep : [],
          course: Array.isArray(teacherData.course) ? teacherData.course : [],
        });
      }
      success("Teacher data loaded successfully");
    } catch (err) {
      setError(err);
      setTeacher(null);
      showError("Failed to load teacher data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (session?.user?.id) {
      getTeacher();
    }
  }, [session?.user?.id]);

  async function addTeacher(data) {
    try {
      setLoading(true);
      const res = await axios.post(`api/teacher`, data, {
        headers: "Content-Type: application/json",
      });
      if (res.ok) {
        await getTeacher();
        success("Teacher added successfully");
      }
      setLoading(false);
    } catch (err) {
      setError(err);
      showError("Failed to add the teacher");
    }
  }
  async function updateTeacher(data) {
    try {
      setLoading(true);
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/teacher`, data, {
        header: "Content-Type: application/json",
      });
      if (res.ok) {
        await getTeacher();
        success("Teacher updated successfully");
      }
      setLoading(false);
    } catch (err) {
      setError(err);
      showError("Failed to update the teacher");
    }
  }
  async function deleteTeacher(id) {
    try {
      setLoading(true);
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/teacher`, id);
      if (res.ok) {
        await getTeacher();
        success("Teacher deleted successfully");
      }
      setLoading(false);
    } catch (err) {
      setError(err);
      showError("Failed to delete the teacher");
    }
  }
  return { teacher, loading, error, addTeacher, updateTeacher, deleteTeacher };
}

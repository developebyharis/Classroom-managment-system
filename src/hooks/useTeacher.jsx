"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useUser } from "./useUser";
import { useSession } from "next-auth/react";

export function useTeacher() {
  const { data: session } = useSession();
  const [teacher, setTeacher] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getTeacher() {
    try {
      setLoading(true);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/teacher`);
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
    } catch (err) {
      console.error("Error fetching teacher:", err);
      setError(err);
      setTeacher(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (session?.user?.id) {
      getTeacher();
    }
  }, [session]);

  async function addTeacher(data) {
    try {
      setLoading(true);
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/teacher`, data, {
        header: "Content-Type: application/json",
      });
      if (res.ok) await getTeacher();
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  }
  async function updateTeacher(data) {
    try {
      setLoading(true);
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/teacher`, data, {
        header: "Content-Type: application/json",
      });
      if (res.ok) await getTeacher();

      setLoading(false);
    } catch (err) {
      setError(err);
    }
  }
  async function deleteTeacher(id) {
    try {
      setLoading(true);
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/teacher`, id);
      if (res.ok) await getTeacher();
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  }
  return { teacher, loading, error, addTeacher, updateTeacher, deleteTeacher };
}

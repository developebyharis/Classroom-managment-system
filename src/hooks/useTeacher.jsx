"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export function useTeacher() {
  const [teacher, setTeacher] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  async function getTeacher() {
    try {
      setLoading(true);
      const res = await axios.get("/api/teacher");
      console.log(res.data);
      const { teacher: teacherData } = res.data;

      setTeacher(teacherData);
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  }
  useEffect(() => {
    getTeacher();
  }, []);

  async function addTeacher(data) {
    try {
      setLoading(true);
      const res = await axios.post("/api/teacher", data, {
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
      const res = await axios.post("/api/teacher", data, {
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
      const res = await axios.delete("/api/teacher", id);
      if (res.ok) await getTeacher();
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  }
  return { teacher, loading, error, addTeacher, updateTeacher, deleteTeacher };
}

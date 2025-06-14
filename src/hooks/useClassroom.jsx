"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export function useClassroom() {
  const [classroom, setClassroom] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  async function getClassroom() {
    try {
      const res = await axios.get("/api/classroom");
      setClassroom(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getClassroom();
  }, []);

  async function addClassroom(data) {
    try {
      setLoading(true);
      const res = await axios.post("/api/classroom", data, {
        header: "Content-Type: application/json",
      });
      if (res.ok) await getClassroom();
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  }
  async function updateClassroom(data) {
    try {
      setLoading(true);
      const res = await axios.post("/api/classroom", data, {
        header: "Content-Type: application/json",
      });
      if (res.ok) await getClassroom();

      setLoading(false);
    } catch (err) {
      setError(err);
    }
  }
  async function deleteClassroom(id) {
    try {
      setLoading(true);
      const res = await axios.delete("/api/classroom", id);
      if (res.ok) await getClassroom();
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  }

  return {
    classroom,
    loading,
    error,
    addClassroom,
    updateClassroom,
    deleteClassroom,
  };
}

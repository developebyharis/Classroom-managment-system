"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export function useClassroom() {
  const [classroom, setClassroom] = useState([]);
  const [classroomById, setClassroomById] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  async function getClassroom() {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/classroom`
      );
      console.log("classroom res", res.data);
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

  async function getClassroomById(id) {
    console.log("hook id", id);
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/classroom/${id}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setClassroomById(res.data);
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  }

  async function addClassroom(data) {
    console.log("data in addClassroom", data);
    try {
      setLoading(true);
      const res = await axios.post(`api/classroom`, data, {
        headers: "Content-Type: application/json",
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
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/classroom`,
        data,
        {
          header: "Content-Type: application/json",
        }
      );
      if (res.ok) await getClassroom();

      setLoading(false);
    } catch (err) {
      setError(err);
    }
  }
  async function deleteClassroom(id) {
    try {
      setLoading(true);
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/classroom`,
        id
      );
      if (res.ok) await getClassroom();
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  }

  return {
    classroom,
    classroomById,
    loading,
    error,
    addClassroom,
    updateClassroom,
    deleteClassroom,
    getClassroomById,
  };
}

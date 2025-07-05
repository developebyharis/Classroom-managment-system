"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSonnerToast } from "@/hooks/useSonnerToast";
import { toast } from "sonner";

export function useClassroom() {
  const [classroom, setClassroom] = useState([]);
  const [classroomById, setClassroomById] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const { success, error: showError, loading: showLoading } = useSonnerToast();

  async function getClassroom() {
    try {
      showLoading("Loading classrooms...");
      const res = await axios.get(`api/classroom`);
      setClassroom(res.data);
      success("Classrooms loaded successfully");
    } catch (err) {
      showError("Failed to load classrooms");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getClassroom();
  }, []);

  async function getClassroomById(id) {
    try {
      showLoading("Loading classroom details...");
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/classroom/${id}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setClassroomById(res.data);
      success("Classroom details loaded");
      setLoading(false);
    } catch (err) {
      setError(err);
      showError("Failed to load classroom");
    }
  }

  async function addClassroom(data) {
    return toast.promise(
      axios.post(`api/classroom`, data, {
        headers: "Content-Type: application/json",
      }).then(async (res) => {
        if (res.ok) await getClassroom();
        return res;
      }),
      {
        loading: "Adding classroom...",
        success: "Classroom added successfully!",
        error: "Failed to add classroom"
      }
    );
  }
  async function updateClassroom(data) {
    return toast.promise(
      axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/classroom`,
        data,
        {
          header: "Content-Type: application/json",
        }
      ).then(async (res) => {
        if (res.ok) await getClassroom();
        return res;
      }),
      {
        loading: "Updating classroom...",
        success: "Classroom updated successfully!",
        error: "Failed to update classroom"
      }
    );
  }
  async function deleteClassroom(id) {
    return toast.promise(
      axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/classroom`,
        id
      ).then(async (res) => {
        if (res.ok) await getClassroom();
        return res;
      }),
      {
        loading: "Deleting classroom...",
        success: "Classroom deleted successfully!",
        error: "Failed to delete classroom"
      }
    );
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

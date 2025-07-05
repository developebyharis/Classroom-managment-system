"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSonnerToast } from "@/hooks/useSonnerToast";

export function useCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { success, error: showError, loading: showLoading } = useSonnerToast();

  async function getCourses() {
    try {
      showLoading("Loading courses...");
      setLoading(true);
      const res = await axios.get("/api/courses");
      if (res.data.success) {
        setCourses(res.data.data);
        success("Courses loaded successfully");
      } else {
        setError(res.data.message);
        showError("Failed to load courses");
      }
    } catch (err) {
      setError(err.message);
      showError("Failed to load courses");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCourses();
  }, []);

  return { courses, loading, error, refetch: getCourses };
} 
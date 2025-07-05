"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export function useCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getCourses() {
    try {
      setLoading(true);
      const res = await axios.get("/api/courses");
      console.log("Courses response:", res.data);
      if (res.data.success) {
        setCourses(res.data.data);
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCourses();
  }, []);

  return { courses, loading, error, refetch: getCourses };
} 
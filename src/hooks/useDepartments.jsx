"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export function useDepartments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getDepartments() {
    try {
      setLoading(true);
      const res = await axios.get("/api/departments");
      if (res.data.success) {
        setDepartments(res.data.data);
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      console.error("Error fetching departments:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getDepartments();
  }, []);

  return { departments, loading, error, refetch: getDepartments };
} 
"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSonnerToast } from "@/hooks/useSonnerToast";

export function useDepartments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { success, error: showError, loading: showLoading } = useSonnerToast();

  async function getDepartments() {
    try {
      showLoading("Loading departments...");
      setLoading(true);
      const res = await axios.get("/api/departments");
      if (res.data.success) {
        setDepartments(res.data.data);
        success("Departments loaded successfully");
      } else {
        setError(res.data.message);
        showError("Failed to load departments");
      }
    } catch (err) {
      setError(err.message);
      showError("Failed to load departments");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getDepartments();
  }, []);

  return { departments, loading, error, refetch: getDepartments };
} 
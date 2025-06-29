"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function useUser() {
  const { data: session, status } = useSession();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getUser() {
    try {
      setLoading(true);
      const { data: users } = await axios.get("/api/credentials");
      const matched = users.data[0].find((u) => u.id === session?.user?.id);
      setUser(matched);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getUser();
  }, [status, session]);


  return {
    user,
    loading,
    error,
  };
}

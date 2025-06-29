"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export function useBooking() {
  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  async function getBookings() {
    try {
      const res = await axios.get("/api/booking");
      setBooking(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getBookings();
  }, []);

  async function addBooking(data) {
    try {
      setLoading(true);
      const res = await axios.post("/api/booking", data, {
        header: "Content-Type: application/json",
      });
      if (res.ok) await getBookings();
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  }
  async function updateBooking(data) {
    try {
      setLoading(true);
      const res = await axios.post("/api/booking", data, {
        header: "Content-Type: application/json",
      });
      if (res.ok) await getBookings();

      setLoading(false);
    } catch (err) {
      setError(err);
    }
  }
  async function deleteBooking(id) {
    console.log("delete id", id);
    try {
      setLoading(true);
      const res = await axios.delete("/api/booking", {
        data: { id },
        headers: { "Content-Type": "application/json" }, 
      });
      if (res.status === 200) await getBookings();
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }

  async function unbookBooking(bookingId) {
    try {
      setLoading(true);
      const res = await axios.patch("/api/booking", {
        bookingId,
        status: "Cancelled",
      });
      if (res.status === 200) {
        await getBookings(); 
      }
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }

  return {
    booking,
    loading,
    error,
    addBooking,
    updateBooking,
    deleteBooking,
    unbookBooking,
  };
}

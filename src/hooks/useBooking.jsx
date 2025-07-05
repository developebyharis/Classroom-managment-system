"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSonnerToast } from "@/hooks/useSonnerToast";

export function useBooking() {
  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const { success, error: showError, loading: showLoading } = useSonnerToast();

  async function getBookings() {
    try {
      showLoading("Loading bookings...");
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/booking`);
      setBooking(res.data);
      success("Bookings loaded successfully");
    } catch (err) {
      setError(err);
      showError("Failed to load bookings");
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
      const res = await axios.post(`api/booking`, data, {
        headers: "Content-Type: application/json",
      });
      if (res.ok) {
        await getBookings();
        success("Classroom booked successfully");
      }
      setLoading(false);
    } catch (err) {
      setError(err);
      showError("Failed to book the classroom");
    }
  }
  async function updateBooking(data) {
    try {
      setLoading(true);
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/booking`, data, {
        header: "Content-Type: application/json",
      });
      if (res.ok) {
        await getBookings();
        success("Booking updated successfully");
      }
      setLoading(false);
    } catch (err) {
      setError(err);
      showError("Failed to update the booking");
    }
  }
  async function deleteBooking(id) {
    console.log("delete id", id);
    try {
      setLoading(true);
      const res = await axios.delete(`api/booking`, {
        data: { id },
        headers: { "Content-Type": "application/json" }, 
      });
      if (res.status === 200) {
        await getBookings();
        success("Booking deleted successfully");
      }
      setLoading(false);
    } catch (err) {
      setError(err);
      showError("Failed to delete the booking");
      setLoading(false);
    }
  }

  async function unbookBooking(bookingId) {
    try {
      setLoading(true);
      const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/booking`, {
        bookingId,
        status: "Cancelled",
      });
      if (res.status === 200) {
        await getBookings();
        success("Booking cancelled successfully");
      }
      setLoading(false);
    } catch (err) {
      setError(err);
      showError("Failed to cancel the booking");
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

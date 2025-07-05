"use client";

import { toast } from "sonner";

export function useSonnerToast() {
  const success = (message) => toast.success(message);
  const error = (message) => toast.error(message);
  const loading = (message) => toast.loading(message);
  const info = (message) => toast.info(message);
  const warning = (message) => toast.warning(message);

  return {
    toast,
    success,
    error,
    loading,
    info,
    warning,
  };
} 